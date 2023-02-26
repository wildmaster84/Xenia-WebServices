import {
  BadRequestException,
  Controller,
  Get,
  Delete,
  Inject,
  NotFoundException,
  Param,
  Ip,
} from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import TitleId from 'src/domain/value-objects/TitleId';
import { Body, Post } from '@nestjs/common/decorators';
import { CreateSessionRequest } from '../requests/CreateSessionRequest';
import { CreateSessionCommand } from 'src/application/commands/CreateSessionCommand';
import SessionId from 'src/domain/value-objects/SessionId';
import IpAddress from 'src/domain/value-objects/IpAddress';
import SessionFlags from 'src/domain/value-objects/SessionFlags';
import { GetSessionQuery } from 'src/application/queries/GetSessionQuery';
import { SessionSearchQuery } from 'src/application/queries/SessionSearchQuery';
import SessionPresentationMapper from '../mappers/SessionPresentationMapper';
import MacAddress from 'src/domain/value-objects/MacAddress';
import { ModifySessionCommand } from 'src/application/commands/ModifySessionCommand';
import { ModifySessionRequest } from '../requests/ModifySessionRequest';
import { JoinSessionCommand } from 'src/application/commands/JoinSessionCommand';
import { JoinSessionRequest } from '../requests/JoinSessionRequest';
import Xuid from 'src/domain/value-objects/Xuid';
import { SessionSearchRequest } from '../requests/SessionSearchRequest';
import { SessionDetailsResponse } from '../responses/SessionDetailsResponse';
import { LeaveSessionRequest } from '../requests/LeaveSessionRequest';
import { LeaveSessionCommand } from 'src/application/commands/LeaveSessionCommand';
import { DeleteSessionCommand } from 'src/application/commands/DeleteSessionCommand';
import { SessionArbitrationResponse } from '../responses/SessionArbitrationResponse';
import Player from 'src/domain/aggregates/Player';
import { GetPlayerQuery } from 'src/application/queries/GetPlayerQuery';
import { FindPlayerQuery } from 'src/application/queries/FindPlayerQuery';
import { SetPlayerSessionIdCommand } from 'src/application/commands/SetPlayerSessionIdCommand';
import axios from 'axios';
import Session from 'src/domain/aggregates/Session';

@ApiTags('Sessions')
@Controller('/title/:titleId/sessions')
export class SessionController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly sessionMapper: SessionPresentationMapper,
  ) {}

  @Post()
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async createSession(
    @Param('titleId') titleId: string,
    @Body() request: CreateSessionRequest,
  ) {
    const flags = new SessionFlags(request.flags);
    let session: Session;
    if (flags.isHost) {
      console.log('Host creating session' + request.sessionId);
      session = await this.commandBus.execute(
        new CreateSessionCommand(
          new TitleId(titleId),
          new SessionId(request.sessionId),
          new IpAddress(request.hostAddress),
          new SessionFlags(request.flags),
          request.publicSlotsCount,
          request.privateSlotsCount,
          new MacAddress(request.macAddress),
          request.port,
        ),
      );
    } else {
      console.log('Peer joining session' + request.sessionId);
      session = await this.queryBus.execute(
        new GetSessionQuery(
          new TitleId(titleId),
          new SessionId(request.sessionId),
        ),
      );
    }

    try {
      const player = await this.queryBus.execute(new FindPlayerQuery(new IpAddress(request.hostAddress)));
      await this.commandBus.execute(new SetPlayerSessionIdCommand(player.xuid, new SessionId(request.sessionId)));
    } catch (error) {
      console.log("BAD PLAYER " + request.hostAddress)
    }
  }

  @Get('/:sessionId')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async getSession(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
  ) {
    const session = await this.queryBus.execute(
      new GetSessionQuery(new TitleId(titleId), new SessionId(sessionId)),
    );

    if (!session) {
      throw new NotFoundException('Session not found.');
    }

    return this.sessionMapper.mapToPresentationModel(session);
  }

  @Delete('/:sessionId')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async deleteSession(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
  ) {
    await this.commandBus.execute(
      new DeleteSessionCommand(new TitleId(titleId), new SessionId(sessionId)),
    );
  }

  // 🌈🌈🌈 This fabulous function is here to slay! Yasss queen! 💅💅💅
  @Get('/:sessionId/details')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async getSessionDetails(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
  ): Promise<SessionDetailsResponse> {
    const session = await this.queryBus.execute(
      new GetSessionQuery(new TitleId(titleId), new SessionId(sessionId)),
    );

    if (!session) {
      throw new NotFoundException('Session not found.');
    }

    // TODO: I think there should be more in here but I haven't worked it out yet.
    // Also, the host flag should probably be unset if requested by a peer.
    return {
      id: session.id.value,
      flags: session.flags.value,
      hostAddress: session.hostAddress.value,
      port: session.port,
      macAddress: session.macAddress.value,
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      openPublicSlotsCount: session.openPublicSlots,
      openPrivateSlotsCount: session.openPrivateSlots,
      filledPublicSlotsCount: session.filledPublicSlots,
      filledPrivateSlotsCount: session.filledPrivateSlots,
      players: session.players.map((xuid) => ({xuid: xuid.value})),
    };
  }




  @Get('/:sessionId/arbitration')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async getSessionArbitration(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
  ): Promise<SessionArbitrationResponse> {
    const session = await this.queryBus.execute(
      new GetSessionQuery(new TitleId(titleId), new SessionId(sessionId)),
    );

    if (!session) {
      throw new NotFoundException('Session not found.');
    }

    const players: Player[] = await Promise.all(
      session.players.map((xuid) => {
        return this.queryBus.execute(new GetPlayerQuery(xuid));
      }
    ));

    const machinePlayers = {};
    players.forEach((player) => {
      if (machinePlayers[player.machineId.value] != undefined)
        machinePlayers[player.machineId.value].push(player);
      else
        machinePlayers[player.machineId.value] = [player];
    });

    const machines: SessionArbitrationResponse['machines'] = [];

    for (const [key, value] of Object.entries(machinePlayers)) {
      machines.push({
        id: key,
        players: (value as Player[]).map((player: Player) => {
          return { xuid: player.xuid.value }
        }),
      });
    }

    return {
      totalPlayers: players.length,
      machines,
    };
  }  
  
  @Post('/:sessionId/modify')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async modifySession(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
    @Body() request: ModifySessionRequest,
  ) {
    await this.commandBus.execute(
      new ModifySessionCommand(
        new TitleId(titleId),
        new SessionId(sessionId),
        new SessionFlags(request.flags),
        request.publicSlotsCount,
        request.privateSlotsCount,
      ),
    );
  }

  @Post('/:sessionId/join')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async joinSession(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
    @Body() request: JoinSessionRequest,
  ) {
    await this.commandBus.execute(
      new JoinSessionCommand(
        new TitleId(titleId),
        new SessionId(sessionId),
        request.xuids.map((xuid) => new Xuid(xuid)),
      ),
    );
  }

  @Post('/:sessionId/leave')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @ApiParam({ name: 'sessionId', example: 'B36B3FE8467CFAC7' })
  async leaveSession(
    @Param('titleId') titleId: string,
    @Param('sessionId') sessionId: string,
    @Body() request: LeaveSessionRequest,
  ) {
    await this.commandBus.execute(
      new LeaveSessionCommand(
        new TitleId(titleId),
        new SessionId(sessionId),
        request.xuids.map((xuid) => new Xuid(xuid)),
      ),
    );
  }

  @Post('/search')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async sessionSearch(
    @Param('titleId') titleId: string,
    @Body() request: SessionSearchRequest,
  ) {
    const sessions = await this.queryBus.execute(
      new SessionSearchQuery(
        new TitleId(titleId),
        request.searchIndex,
        request.resultsCount,
      ),
    );

    return sessions.map(this.sessionMapper.mapToPresentationModel);
  }
}
