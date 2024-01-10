import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AggregateSessionCommand } from '../commands/AggregateSessionCommand';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';

@CommandHandler(AggregateSessionCommand)
export class AggregateSessionCommandHandler
  implements ICommandHandler<AggregateSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute() {
    return this.repository.findAllAdvertisedSessions();
  }
}
