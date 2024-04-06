import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { XeniaModule } from './src/xenia.module';
import PresentationSettings from 'src/infrastructure/presentation/settings/PresentationSettings';
import PersistanceSettings from 'src/infrastructure/persistance/settings/PersistanceSettings';
import compression from 'compression';
import helmet from 'helmet';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const logger = new ConsoleLogger('Main');

  const app = await NestFactory.create(XeniaModule, {
    rawBody: true,
  });

  const envs = new PersistanceSettings().get();

  if (envs.swagger_API == 'true') {
    const config = new DocumentBuilder()
      .setTitle('Xenia Web API')
      .setDescription('')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'sha256-Zww3/pDgfYVU8OPCr/mr7NFf4ZA0lY1Xeb22wR47e0w='",
          ],
          upgradeInsecureRequests:
            envs.SSL == 'true' || envs.SSL == undefined ? [] : null,
        },
      },
    }),
  );
  app.use(compression());

  // Support Heroku
  const PORT = process.env.PORT || new PresentationSettings().get().port;

  await app.listen(PORT);

  logger.debug(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
