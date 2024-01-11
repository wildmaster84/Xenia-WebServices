import { Controller, Inject, Get, Header } from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { readFile } from 'fs/promises';
import { AggregateSessionCommand } from 'src/application/commands/AggregateSessionCommand';

@Controller()
export class IndexController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/')
  @Header('content-type', 'text/html')
  async index() {
    const file = await readFile('index.html');
    return file.toString('utf8');
  }

  @Get('/sessions')
  @Header('content-type', 'application/json')
  async sessionData() {
    const sessionsJSON = await this.commandBus.execute(
      new AggregateSessionCommand(),
    );

    return sessionsJSON;
  }
}
