// Runs before the e2e tests load any module. Uses a disposable database if one is provided.
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ?? 'postgresql://x:x@localhost:5432/x_not_used';
process.env.REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
