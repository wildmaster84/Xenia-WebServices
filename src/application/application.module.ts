import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistanceModule } from 'src/infrastructure/persistance/persistance.module';
import { CreateSessionCommandHandler } from './commandHandlers/CreateSessionCommandHandler';
import { ModifySessionCommandHandler } from './commandHandlers/ModifySessionCommandHandler';
import { GetSessionsQueryHandler } from './queryHandlers/GetSessionQueryHandler';
import { GetTitleServersQueryHandler } from './queryHandlers/GetTitleServerQueryHandler';
import { SessionSearchQueryHandler } from './queryHandlers/SessionSearchQueryHandler';

export const queryHandlers = [
  GetTitleServersQueryHandler,
  GetSessionsQueryHandler,
  SessionSearchQueryHandler,
];

export const commandHandlers = [
  CreateSessionCommandHandler,
  ModifySessionCommandHandler,
];

@Module({
  imports: [CqrsModule, PersistanceModule],
  providers: [...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
