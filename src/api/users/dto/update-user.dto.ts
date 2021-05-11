import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { SchemaTypes } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { Role } from '@schema/role.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  active!: boolean;
  token!: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: Role.name })
  role?: Role | undefined;
}
