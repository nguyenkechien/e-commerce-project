import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
    console.log(`object`)
  await server.listen(3000);
}

bootstrap();
