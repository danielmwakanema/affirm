import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Affirmation {
  @Prop()
  body: string;
}

export type AffirmationDocument = Affirmation & Document<Affirmation>;

export const AffirmationSchema = SchemaFactory.createForClass(Affirmation);
