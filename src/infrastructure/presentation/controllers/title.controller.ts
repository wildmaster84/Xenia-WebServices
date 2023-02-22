import {
  Controller,
  Get,
  Inject,
  Param,
} from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { GetTitleServersQuery } from 'src/application/queries/GetTitleServersQuery';
import TitleId from 'src/domain/value-objects/TitleId';
import TitleServerPresentationMapper from '../mappers/TitleServerPresentationMapper';

@ApiTags('Title')
@Controller('/title/:titleId')
export class TitleController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly titleServerMapper: TitleServerPresentationMapper,
  ) {}

  @Get('/servers')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  async getTitleServer(@Param('titleId') titleId: string) {
    const servers = await this.queryBus.execute(
      new GetTitleServersQuery(new TitleId(titleId)),
    );

    return servers.map(this.titleServerMapper.mapToPresentationModel);
  }
}
