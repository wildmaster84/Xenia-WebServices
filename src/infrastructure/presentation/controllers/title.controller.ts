import {
  Controller,
  Get,
  Inject,
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

@ApiTags('Title')
@Controller('/title/:titleId')
export class TitleController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly presentationMapper: TitleServerPresentationMapper,
  ) {}

  @Get('/servers')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async getTitleServer(@Param('titleId') titleId: string) {
    const servers = await this.queryBus.execute(
      new GetTitleServersQuery(new TitleId(titleId)),
    );

    return servers.map(this.presentationMapper.mapToPresentationModel);
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
    }
  }
}
