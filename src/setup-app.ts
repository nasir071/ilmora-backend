import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

// Shared by main.ts and the e2e tests so both run the same setup.
export function setupApp(app: INestApplication, corsOrigin: string) {
  app.use(helmet());
  app.enableCors({ origin: corsOrigin.split(','), credentials: true });
  app.setGlobalPrefix('api/v1', { exclude: [] });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ilmora API')
    .setDescription('School & Academy Management SaaS API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
}
