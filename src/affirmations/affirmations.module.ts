import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffirmationsService } from './affirmations.service';
import { Affirmation, AffirmationSchema } from './schemas/affirmation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affirmation.name, schema: AffirmationSchema },
    ]),
  ],
  providers: [AffirmationsService],
  exports: [AffirmationsService],
})
export class AffirmationsModule {}
