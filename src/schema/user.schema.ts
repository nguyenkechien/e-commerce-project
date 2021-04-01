import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
})
export class User implements TimestampInterface {
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    required: false,
    default: false,
  })
  active!: boolean;

  @Prop({
    required: false,
  })
  token!: string;

  @Prop({
    index: true,
    type: SchemaTypes.ObjectId,
    ref: Role.name,
  })
  role!: Role;

  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
