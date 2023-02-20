import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { GetTitleServersQuery } from 'src/application/queries/GetTitleServersQuery';
import TitleId from 'src/domain/value-objects/TitleId';
import TitleServerPresentationMapper from '../mappers/TitleServerPresentationMapper';
import { Body, Post } from '@nestjs/common/decorators';
import { SessionRequest } from '../requests/SessionRequest';
import { CreateSessionCommand } from 'src/application/commands/CreateSessionCommand';
import SessionId from 'src/domain/value-objects/SessionId';
import IpAddress from 'src/domain/value-objects/IpAddress';
import SessionFlags from 'src/domain/value-objects/SessionFlags';
import { GetSessionQuery } from 'src/application/queries/GetSessionQuery';
import { NotFoundError } from 'rxjs';
import { SessionSearchQuery } from 'src/application/queries/SessionSearchQuery';
import SessionPresentationMapper from '../mappers/SessionPresentationMapper';

@ApiTags('Title')
@Controller('/title/:titleId')
export class TitleController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly titleServerMapper: TitleServerPresentationMapper,
    private readonly sessionMapper: SessionPresentationMapper,
  ) {}

  @Get('/servers')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async getTitleServer(@Param('titleId') titleId: string) {
    const servers = await this.queryBus.execute(
      new GetTitleServersQuery(new TitleId(titleId)),
    );

    return servers.map(this.titleServerMapper.mapToPresentationModel);
  }

  @Post('/sessions')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async createSession(
    @Param('titleId') titleId: string,
    @Body() request: SessionRequest,
  ) {
    const flags = new SessionFlags(request.flags);
    if (flags.isHost) {
      await this.commandBus.execute(
        new CreateSessionCommand(
          new TitleId(titleId),
          new SessionId(request.sessionId),
          new IpAddress(request.hostAddress),
          new SessionFlags(request.flags),
          request.publicSlotsCount,
          request.privateSlotsCount,
          request.userIndex,
        ),
      );
    } else {
      throw new BadRequestException("Can't create a session if you aren't the host.")
    }
  }

  @Get('/sessions/:sessionId')
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

  @Get('/sessions')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async sessionSearch(@Param('titleId') titleId: string) {
    const sessions = await this.queryBus.execute(
      new SessionSearchQuery(new TitleId(titleId)),
    );

    return sessions.map(this.sessionMapper.mapToPresentationModel);
  }
}
