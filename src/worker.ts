import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env';
import { DatabaseModule } from './database/database.module';

// Background worker process (BullMQ queues are added in later stages).
// It shares the same code and database as the API but runs as a separate process.
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }), DatabaseModule],
})
class WorkerModule {}

async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
  console.log('Ilmora worker started (no queues registered yet)');
}

bootstrap();
