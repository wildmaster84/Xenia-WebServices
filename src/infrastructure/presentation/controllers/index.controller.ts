import { Controller, Inject, Get, Header } from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AggregateSessionCommand } from 'src/application/commands/AggregateSessionCommand';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Index')
@Controller()
export class IndexController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/sessions')
  @Header('content-type', 'application/json')
  async sessionData() {
    const sessionsJSON = await this.commandBus.execute(
      new AggregateSessionCommand(),
    );

    return sessionsJSON;
  }
}
