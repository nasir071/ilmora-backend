import { validateEnv } from './env';

const validConfig = {
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
  REDIS_URL: 'redis://localhost:6379',
};

describe('validateEnv', () => {
  it('applies defaults for optional values', () => {
    const env = validateEnv(validConfig);
    expect(env.PORT).toBe(4000);
    expect(env.APP_TIMEZONE).toBe('Asia/Karachi');
    expect(env.NODE_ENV).toBe('development');
  });

  it('converts PORT from string to number', () => {
    expect(validateEnv({ ...validConfig, PORT: '5000' }).PORT).toBe(5000);
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(() => validateEnv({ REDIS_URL: 'redis://localhost:6379' })).toThrow(/DATABASE_URL/);
  });

  it('rejects an invalid NODE_ENV', () => {
    expect(() => validateEnv({ ...validConfig, NODE_ENV: 'staging-x' })).toThrow(/NODE_ENV/);
  });
});
