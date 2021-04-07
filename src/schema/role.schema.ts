import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;
@Schema({
  timestamps: true,
})
export class Role extends Document implements TimestampInterface {
  @Prop({
    required: true,
    trim: true,
    type: String,
    unique: true,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
  })
  isAdmin!: boolean;

  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
