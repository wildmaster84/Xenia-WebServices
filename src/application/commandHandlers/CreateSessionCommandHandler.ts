import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Session from 'src/domain/aggregates/Session';
import ISessionRepository, { ISessionRepositorySymbol } from 'src/domain/repositories/ISessionRepository';
import { CreateSessionCommand } from '../commands/CreateSessionCommand';

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler
  implements ICommandHandler<CreateSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: CreateSessionCommand) {
    return this.repository.save(
      new Session({
        id: command.sessionId,
        titleId: command.title,
        flags: command.flags,
        hostAddress: command.hostAddress,
        publicSlotsCount: command.publicSlotsCount,
        privateSlotsCount: command.privateSlotsCount,
        userIndex: command.userIndex,
        macAddress: command.macAddress,
        port: command.port,
      }),
    );
  }
}
