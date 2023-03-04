import { Module } from '@nestjs/common';
import PersistanceSettings from './settings/PersistanceSettings';
import { MongooseModule } from '@nestjs/mongoose';
import { TitleServer, TitleServerSchema } from './models/TitleServerSchema';
import { ITitleServerRepositorySymbol } from 'src/domain/repositories/ITitleServerRepository';
import TitleServerRepository from './repositories/TitleServerRepository';
import TitleServerPersistanceMapper from './mappers/TitleServerPersistanceMapper';
import TitleServerDomainMapper from './mappers/TitleServerDomainMapper';
import { ILeaderboardRepositorySymbol } from 'src/domain/repositories/ILeaderboardRepository';
import LeaderboardRepository from './repositories/LeaderboardRepository';
import LeaderboardPersistanceMapper from './mappers/LeaderboardPersistanceMapper';
import LeaderboardDomainMapper from './mappers/LeaderboardDomainMapper';
import { Leaderboard, LeaderboardSchema } from './models/LeaderboardSchema';
import { IPlayerRepositorySymbol } from 'src/domain/repositories/IPlayerRepository';
import PlayerRepository from './repositories/PlayerRepository';
import PlayerPersistanceMapper from './mappers/PlayerPersistanceMapper';
import PlayerDomainMapper from './mappers/PlayerDomainMapper';
import { Player, PlayerSchema } from './models/PlayerSchema';
import { ISessionRepositorySymbol } from 'src/domain/repositories/ISessionRepository';
import SessionRepository from './repositories/SessionRepository';
import SessionPersistanceMapper from './mappers/SessionPersistanceMapper';
import SessionDomainMapper from './mappers/SessionDomainMapper';
import { Session, SessionSchema } from './models/SessionSchema';

const persistanceSettings = new PersistanceSettings().get();

@Module({
  imports: [
    MongooseModule.forRoot(persistanceSettings.mongoURI),
    MongooseModule.forFeature([
      { name: TitleServer.name, schema: TitleServerSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Leaderboard.name, schema: LeaderboardSchema },
      { name: Player.name, schema: PlayerSchema },
    ]),
  ],
  providers: [
    {
      provide: ITitleServerRepositorySymbol,
      useClass: TitleServerRepository,
    },
    TitleServerPersistanceMapper,
    TitleServerDomainMapper,

    {
      provide: ISessionRepositorySymbol,
      useClass: SessionRepository,
    },
    SessionPersistanceMapper,
    SessionDomainMapper,

    {
      provide: ILeaderboardRepositorySymbol,
      useClass: LeaderboardRepository,
    },
    LeaderboardPersistanceMapper,
    LeaderboardDomainMapper,

    {
      provide: IPlayerRepositorySymbol,
      useClass: PlayerRepository,
    },
    PlayerPersistanceMapper,
    PlayerDomainMapper,
  ],
  exports: [
    ITitleServerRepositorySymbol,
    ISessionRepositorySymbol,
    ILeaderboardRepositorySymbol,
    IPlayerRepositorySymbol,
  ],
})
export class PersistanceModule {}
