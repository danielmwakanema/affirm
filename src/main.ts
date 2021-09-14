import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AFFIRM_API_PORT, AFFIRM_API_VERSION } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>(AFFIRM_API_PORT) || 3000;
  const VERSION = configService.get<string>(AFFIRM_API_VERSION) || 'v1';
  const PREFIX = `/api/${VERSION}`;

  app.setGlobalPrefix(PREFIX);
  app.enableCors();

  await app.listen(PORT);
}
bootstrap();
