import { Role } from '@schema/role.schema';
import { SchemaTypes } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: Role.name })
  role?: Role | undefined;
}
