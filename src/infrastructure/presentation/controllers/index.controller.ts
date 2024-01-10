import { Controller, Inject, Get, Header } from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { readFile } from 'fs/promises';
import { AggregateSessionCommand } from 'src/application/commands/AggregateSessionCommand';
import Session from 'src/domain/aggregates/Session';

const titleIdToTitleMap = {};

@Controller()
export class IndexController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {
    this.LoadTitleIds();
  }

  async LoadTitleIds() {
    const title_ids_file = await readFile('title_ids.json');
    const ids = JSON.parse(title_ids_file.toString('utf8'));

    ids.forEach((title) => {
      titleIdToTitleMap[title.titleid] = title.title;
    });
  }

  @Get('/')
  @Header('content-type', 'text/html')
  async root() {
    const sessions = await this.commandBus.execute(
      new AggregateSessionCommand(),
    );

    let rows = '';

    sessions.forEach(async (session: Session) => {
      const title =
        titleIdToTitleMap[session.titleId.toString()] + ' - ' + session.titleId;
      const row = `<tr><td> ${title} </td><td> ${session.players.length} </td></tr>`;

      rows += row;
    });

    const file = await readFile('index.html');

    let index = file.toString('utf8');
    index = index.replace('{rows}', rows);

    return index;
  }
}
