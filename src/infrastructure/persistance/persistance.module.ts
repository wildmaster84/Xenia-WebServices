import { Module } from '@nestjs/common';
import PersistanceSettings from './settings/PersistanceSettings';
import { MongooseModule } from '@nestjs/mongoose';
import { TitleServer, TitleServerSchema } from './models/TitleServerSchema';
import { ITitleServerRepositorySymbol } from 'src/domain/repositories/ITitleServerRepository';
import TitleServerRepository from './repositories/TitleServerRepository';
import TitleServerPersistanceMapper from './mappers/TitleServerPersistanceMapper';
import TitleServerDomainMapper from './mappers/TitleServerDomainMapper';

const persistanceSettings = new PersistanceSettings().get();

@Module({
  imports: [
    MongooseModule.forRoot(persistanceSettings.mongoURI),
    MongooseModule.forFeature([
      { name: TitleServer.name, schema: TitleServerSchema },
    ]),
  ],
  providers: [
    {
      provide: ITitleServerRepositorySymbol,
      useClass: TitleServerRepository,
    },
    TitleServerPersistanceMapper,
    TitleServerDomainMapper,
  ],
  exports: [
    ITitleServerRepositorySymbol,
  ],
})
export class PersistanceModule {}
