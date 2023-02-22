import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppLoggerMiddleware } from './AppLoggerMiddleware';
import { TitleController } from './controllers/title.controller';
import { CqrsModule } from '@nestjs/cqrs';
import TitleServerPresentationMapper from './mappers/TitleServerPresentationMapper';
import SessionPresentationMapper from './mappers/SessionPresentationMapper';
import { XNetController } from './controllers/xnet.controller';
import { SessionController } from './controllers/session.controller';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [
    TitleController,
    XNetController,
    SessionController,
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
