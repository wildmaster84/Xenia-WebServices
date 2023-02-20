import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppLoggerMiddleware } from './AppLoggerMiddleware';
import { TitleController } from './controllers/title.controller';
import { CqrsModule } from '@nestjs/cqrs';
import TitleServerPresentationMapper from './mappers/TitleServerPresentationMapper';
import SessionPresentationMapper from './mappers/SessionPresentationMapper';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [
    TitleController,
  ],
  providers: [
    TitleServerPresentationMapper,
    SessionPresentationMapper,
  ],
})
export class PresentationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
