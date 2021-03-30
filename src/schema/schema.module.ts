import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperService } from '@core/services/helper.services';
import { Role, RoleSchema } from './role.schema';
import { User, UserSchema } from './user.schema';

const modeSchemas = [
  MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [HelperService],
      inject: [HelperService],
      useFactory: async (helperService: HelperService) => {
        console.log(`useFactory`);
        return {
          uri: helperService.getMongoUri(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
          connectionFactory: (connection: Record<any, any>): any => {
            return connection;
          },
        };
      },
    }),
    ...modeSchemas,
  ],
  exports: [...modeSchemas],
})
export class SchemaModule {}
