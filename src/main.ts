import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  setupApp(app, config.get<string>('CORS_ORIGIN', 'http://localhost:3000'));
  await app.listen(config.get<number>('PORT', 4000));
}

bootstrap();
