import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistanceModule } from 'src/infrastructure/persistance/persistance.module';
import { CreateSessionCommandHandler } from './commandHandlers/CreateSessionCommandHandler';
import { GetTitleServersQueryHandler } from './queryHandlers/GetTitleServerQueryHandler';

export const queryHandlers = [
  GetTitleServersQueryHandler,
];

export const commandHandlers = [
  CreateSessionCommandHandler,
];

@Module({
  imports: [CqrsModule, PersistanceModule],
  providers: [...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
