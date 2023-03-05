import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistanceModule } from 'src/infrastructure/persistance/persistance.module';
import { CreatePlayerCommandHandler } from './commandHandlers/CreatePlayerCommandHandler';
import { CreateSessionCommandHandler } from './commandHandlers/CreateSessionCommandHandler';
import { DeleteSessionCommandHandler } from './commandHandlers/DeleteSessionCommandHandler';
import { JoinSessionCommandHandler } from './commandHandlers/JoinSessionCommandHandler';
import { LeaveSessionCommandHandler } from './commandHandlers/LeaveSessionCommandHandler';
import { MigrateSessionCommandHandler } from './commandHandlers/MigrateSessionCommandHandler';
import { ModifySessionCommandHandler } from './commandHandlers/ModifySessionCommandHandler';
import { SetPlayerSessionIdCommandHandler } from './commandHandlers/SetPlayerSessionIdCommandHandler';
import { UpdateLeaderboardCommandHandler } from './commandHandlers/UpdateLeaderboardCommandHandler';
import { FindLeaderboardsQueryHandler } from './queryHandlers/FindLeaderboardsQueryHandler';
import { FindPlayerQueryHandler } from './queryHandlers/FindPlayerQueryHandler';
import { FindPlayerSessionQueryHandler } from './queryHandlers/FindPlayerSessionQueryHandler';
import { GetPlayerQueryHandler } from './queryHandlers/GetPlayerQueryHandler';
import { GetSessionsQueryHandler } from './queryHandlers/GetSessionQueryHandler';
import { SessionSearchQueryHandler } from './queryHandlers/SessionSearchQueryHandler';

export const queryHandlers = [
  GetSessionsQueryHandler,
  SessionSearchQueryHandler,
  FindPlayerQueryHandler,
  FindPlayerSessionQueryHandler,
  GetPlayerQueryHandler,
  FindLeaderboardsQueryHandler,
];

export const commandHandlers = [
  CreateSessionCommandHandler,
  ModifySessionCommandHandler,
  JoinSessionCommandHandler,
  LeaveSessionCommandHandler,
  CreatePlayerCommandHandler,
  DeleteSessionCommandHandler,
  SetPlayerSessionIdCommandHandler,
  UpdateLeaderboardCommandHandler,
  MigrateSessionCommandHandler,
];

@Module({
  imports: [CqrsModule, PersistanceModule],
  providers: [...queryHandlers, ...commandHandlers],
})
export class ApplicationModule {}
