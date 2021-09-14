import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import {
  AFFIRM_API_PORT,
  AFFIRM_API_VERSION,
  APP_DESCRIPTION,
  APP_NAME,
} from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>(AFFIRM_API_PORT) || 3000;
  const VERSION = configService.get<string>(AFFIRM_API_VERSION) || 'v1';
  const PREFIX = `/api/${VERSION}`;

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix(PREFIX);

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  await app.listen(PORT);
}
bootstrap();
