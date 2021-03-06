import { Module } from '@nestjs/common';
import { optionalRequire } from '@nestjs/core/helpers/optional-require';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperService } from '@utils/services/helper.services';
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
            connection.plugin(optionalRequire('mongoose-paginate-v2'));
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
