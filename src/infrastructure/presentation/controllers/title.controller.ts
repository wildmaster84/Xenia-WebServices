import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { Response } from 'express';
import { stat } from 'fs/promises';
import { createReadStream, existsSync } from 'fs';

@ApiTags('Title')
@Controller('/title/:titleId')
export class TitleController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/servers')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @Header('content-type', 'application/json')
  async getTitleServers(
    @Param('titleId') titleId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const path = join(
      process.cwd(),
      'titles',
      titleId.toUpperCase(),
      'servers.json',
    );

    if (!existsSync(path)) return [];

    const stats = await stat(path);

    res.set('Content-Length', stats.size.toString());
    return new StreamableFile(createReadStream(path));
  }

  @Get('/ports')
  @ApiParam({ name: 'titleId', example: '4D5307E6' })
  @Header('content-type', 'application/json')
  async getTitlePorts(
    @Param('titleId') titleId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const path = join(
      process.cwd(),
      'titles',
      titleId.toUpperCase(),
      'ports.json',
    );

    if (!existsSync(path)) return {};

    const stats = await stat(path);

    res.set('Content-Length', stats.size.toString());
    return new StreamableFile(createReadStream(path));
  }
}
