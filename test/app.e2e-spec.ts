import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { setupApp } from '../src/setup-app';

// Runs with a fake database so it works anywhere. Real database checks are in health-db.e2e-spec.ts.
describe('App (database mocked)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fakePrisma = {
      $connect: async () => undefined,
      $disconnect: async () => undefined,
      $queryRaw: async () => [{ '?column?': 1 }],
    };
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(fakePrisma)
      .compile();
    app = moduleRef.createNestApplication();
    setupApp(app, 'http://localhost:3000');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health returns status ok', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.info.database.status).toBe('up');
  });

  it('GET /api/docs loads Swagger UI', async () => {
    const res = await request(app.getHttpServer()).get('/api/docs').expect(200);
    expect(res.text).toContain('swagger');
  });

  it('GET /api/docs-json exposes the health endpoint in the OpenAPI document', async () => {
    const res = await request(app.getHttpServer()).get('/api/docs-json').expect(200);
    expect(res.body.paths['/api/v1/health']).toBeDefined();
  });

  it('sends security headers', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
