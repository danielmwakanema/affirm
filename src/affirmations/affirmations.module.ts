import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LogModule } from '../log/log.module';
import { AffirmationsService } from './affirmations.service';
import { Affirmation, AffirmationSchema } from './schemas/affirmation.schema';
import { AFFIRM_CACHE_TTL } from '../common/constants';
import { AffirmationsController } from './affirmations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affirmation.name, schema: AffirmationSchema },
    ]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (service: ConfigService) => ({
        ttl: service.get<number>(AFFIRM_CACHE_TTL),
      }),
      inject: [ConfigService],
    }),
    LogModule,
  ],
  providers: [AffirmationsService],
  exports: [AffirmationsService],
  controllers: [AffirmationsController],
})
export class AffirmationsModule {}
