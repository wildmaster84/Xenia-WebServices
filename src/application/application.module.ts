import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistanceModule } from 'src/infrastructure/persistance/persistance.module';
import { GetTitleServersQueryHandler } from './queryHandlers/GetFileshareQueryHandler';

export const QueryHandlers = [
  GetTitleServersQueryHandler,
];

@Module({
  imports: [CqrsModule, PersistanceModule],
  providers: [...QueryHandlers],
})
export class ApplicationModule {}
