import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TitleServerDocument = TitleServer & Document;

@Schema()
export class TitleServer {
  @Prop({ required: true })
  titleId: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  flags: number;
  @Prop({ required: true })
  description: string;
}

export const TitleServerSchema = SchemaFactory.createForClass(TitleServer);

TitleServerSchema.index({ titleId: 1, address: 1 }, { unique: true });

