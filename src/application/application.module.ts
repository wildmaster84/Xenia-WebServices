import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistanceModule } from 'src/infrastructure/persistance/persistance.module';
import { CreatePlayerCommandHandler } from './commandHandlers/CreatePlayerCommandHandler';
import { CreateSessionCommandHandler } from './commandHandlers/CreateSessionCommandHandler';
import { DeleteSessionCommandHandler } from './commandHandlers/DeleteSessionCommandHandler';
import { JoinSessionCommandHandler } from './commandHandlers/JoinSessionCommandHandler';
import { LeaveSessionCommandHandler } from './commandHandlers/LeaveSessionCommandHandler';
import { ModifySessionCommandHandler } from './commandHandlers/ModifySessionCommandHandler';
import { SetPlayerSessionIdCommandHandler } from './commandHandlers/SetPlayerSessionIdCommandHandler';
import { FindPlayerQueryHandler } from './queryHandlers/FindPlayerQueryHandler';
import { FindPlayerSessionQueryHandler } from './queryHandlers/FindPlayerSessionQueryHandler';
import { GetPlayerQueryHandler } from './queryHandlers/GetPlayerQueryHandler';
import { GetSessionsQueryHandler } from './queryHandlers/GetSessionQueryHandler';
import { GetTitleServersQueryHandler } from './queryHandlers/GetTitleServerQueryHandler';
import { SessionSearchQueryHandler } from './queryHandlers/SessionSearchQueryHandler';

export const queryHandlers = [
  GetTitleServersQueryHandler,
  GetSessionsQueryHandler,
  SessionSearchQueryHandler,
  FindPlayerQueryHandler,
  FindPlayerSessionQueryHandler,
  GetPlayerQueryHandler,
];

export const commandHandlers = [
  CreateSessionCommandHandler,
  ModifySessionCommandHandler,
  JoinSessionCommandHandler,
  LeaveSessionCommandHandler,
  CreatePlayerCommandHandler,
  DeleteSessionCommandHandler,
  SetPlayerSessionIdCommandHandler,
];

@Module({
  imports: [CqrsModule, PersistanceModule],
  providers: [...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
