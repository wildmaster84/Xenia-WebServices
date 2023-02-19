import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { XeniaModule } from './src/xenia.module';
import PresentationSettings from 'src/infrastructure/presentation/settings/PresentationSettings';

async function bootstrap() {
  const app = await NestFactory.create(XeniaModule);

  const config = new DocumentBuilder()
    .setTitle('Xenia Web API')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(new PresentationSettings().get().port);
}
bootstrap();
