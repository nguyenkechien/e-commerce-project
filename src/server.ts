import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'reflect-metadata';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const server = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await server.listen(3000);
  console.log(`Application is running on: ${await server.getUrl()}`);
};

bootstrap();
