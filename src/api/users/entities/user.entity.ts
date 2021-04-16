import { Role } from '@src/schema/role.schema';
import { LeanDocument } from 'mongoose';

export class UserEntity {
  _id!: any;
  __v!: number | undefined;
  id?: any;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  email!: string;
  active!: boolean;
  token!: string;
  role!: LeanDocument<Role>;
}
