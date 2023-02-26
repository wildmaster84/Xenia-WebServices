import { Module } from '@nestjs/common';
import PersistanceSettings from './settings/PersistanceSettings';
import { MongooseModule } from '@nestjs/mongoose';
import { TitleServer, TitleServerSchema } from './models/TitleServerSchema';
import { ITitleServerRepositorySymbol } from 'src/domain/repositories/ITitleServerRepository';
import TitleServerRepository from './repositories/TitleServerRepository';
import TitleServerPersistanceMapper from './mappers/TitleServerPersistanceMapper';
import TitleServerDomainMapper from './mappers/TitleServerDomainMapper';
import { ISessionRepositorySymbol } from 'src/domain/repositories/ISessionRepository';
import SessionRepository from './repositories/SessionRepository';
import SessionPersistanceMapper from './mappers/SessionPersistanceMapper';
import SessionDomainMapper from './mappers/SessionDomainMapper';
import { Session, SessionSchema } from './models/SessionSchema';
import { IPlayerRepositorySymbol } from 'src/domain/repositories/IPlayerRepository';
import PlayerRepository from './repositories/PlayerRepository';
import PlayerPersistanceMapper from './mappers/PlayerPersistanceMapper';
import PlayerDomainMapper from './mappers/PlayerDomainMapper';
import { Player, PlayerSchema } from './models/PlayerSchema';

const persistanceSettings = new PersistanceSettings().get();

@Module({
  imports: [
    MongooseModule.forRoot(persistanceSettings.mongoURI),
    MongooseModule.forFeature([
      { name: TitleServer.name, schema: TitleServerSchema },
      { name: Session.name, schema: SessionSchema },
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
      provide: IPlayerRepositorySymbol,
      useClass: PlayerRepository,
    },
    PlayerPersistanceMapper,
    PlayerDomainMapper,
  ],
  exports: [
    ITitleServerRepositorySymbol,
    ISessionRepositorySymbol,
    IPlayerRepositorySymbol,
  ],
})
export class PersistanceModule {}
