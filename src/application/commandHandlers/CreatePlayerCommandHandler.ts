import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Player from 'src/domain/aggregates/Player';
import IPlayerRepository, { IPlayerRepositorySymbol } from 'src/domain/repositories/IPlayerRepository';
import { CreatePlayerCommand } from '../commands/CreatePlayerCommand';

@CommandHandler(CreatePlayerCommand)
export class CreatePlayerCommandHandler
  implements ICommandHandler<CreatePlayerCommand>
{
  constructor(
    @Inject(IPlayerRepositorySymbol)
    private repository: IPlayerRepository,
  ) {}

  async execute(command: CreatePlayerCommand) {
    return this.repository.save(
      Player.create({
        xuid: command.xuid,
        hostAddress: command.hostAddress,
        macAddress: command.macAddress,
        machineId: command.machineId,
      }),
    );
  }
}
