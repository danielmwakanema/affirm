import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LogModule } from './log/log.module';
import { AffirmationsModule } from './affirmations/affirmations.module';
import { AFFIRM_API_MONGO_URI } from './common/constants';
import { TwilioModule } from './twilio/twilio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        uri: service.get<string>(AFFIRM_API_MONGO_URI),
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    LogModule,
    AffirmationsModule,
    TwilioModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
