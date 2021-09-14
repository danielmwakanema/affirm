import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LogModule } from './log/log.module';
import { AffirmationsModule } from './affirmations/affirmations.module';
import { AFFIRM_API_MONGO_URI, AFFIRM_CACHE_TTL } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        uri: service.get<string>(AFFIRM_API_MONGO_URI),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        ttl: service.get<number>(AFFIRM_CACHE_TTL),
      }),
      inject: [ConfigService],
    }),
    LogModule,
    AffirmationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
