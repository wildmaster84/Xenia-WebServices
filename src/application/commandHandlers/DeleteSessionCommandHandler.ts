import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Session from 'src/domain/aggregates/Session';
import ISessionRepository, { ISessionRepositorySymbol } from 'src/domain/repositories/ISessionRepository';
import { CreateSessionCommand } from '../commands/CreateSessionCommand';
import { DeleteSessionCommand } from '../commands/DeleteSessionCommand';

@CommandHandler(DeleteSessionCommand)
export class DeleteSessionCommandHandler
  implements ICommandHandler<DeleteSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: DeleteSessionCommand) {
    const session = await this.repository.findSession(command.title, command.sessionId);
    if (session) {
      session.delete();
      this.repository.save(session);
    }
  }
}
