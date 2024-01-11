import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AggregateSessionCommand } from '../commands/AggregateSessionCommand';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import Session from 'src/domain/aggregates/Session';
import { readFile } from 'fs/promises';

const titleIdToTitleMap = {};

@CommandHandler(AggregateSessionCommand)
export class AggregateSessionCommandHandler
  implements ICommandHandler<AggregateSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
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

  async execute() {
    const sessions = await this.repository.findAllAdvertisedSessions();

    const titles = {};

    sessions.forEach(async (session: Session) => {
      const title =
        titleIdToTitleMap[session.titleId.toString()] + ' - ' + session.titleId;
      const players = session.players.length;

      if (!titles[title]) {
        titles[title] = [];
      }

      titles[title].push({ players: players });
    });

    return JSON.stringify(titles);
  }
}
