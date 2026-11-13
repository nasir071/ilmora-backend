import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/prisma.service';
import { setupApp } from '../src/setup-app';

// Real database test. Set TEST_DATABASE_URL to a DISPOSABLE database; skipped otherwise.
const testDatabaseUrl = process.env.TEST_DATABASE_URL;
const describeIfDb = testDatabaseUrl ? describe : describe.skip;

describeIfDb('Health with real PostgreSQL', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    setupApp(app, 'http://localhost:3000');
    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('reports database up', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
    expect(res.body.info.database.status).toBe('up');
  });

  it('bootstrap migration created the app_metadata table', async () => {
    const rows = await prisma.appMetadata.findMany();
    expect(Array.isArray(rows)).toBe(true);
  });
});
