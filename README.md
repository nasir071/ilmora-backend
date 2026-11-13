# Ilmora Backend

API for **Ilmora**, a multi-tenant School & Academy Management SaaS for Pakistan (PKR, Asia/Karachi).

Stack: NestJS 11, Prisma 7, PostgreSQL, Redis. Status: **Stage 0 (foundation)**. No login or business features yet.

## Prerequisites
- Node.js (LTS) and npm
- PostgreSQL and Redis running locally

## Setup
```bash
npm install
cp .env.example .env   # then fill in real values locally
npm run prisma:migrate
npm run start:dev
```

`DATABASE_URL` format: `postgresql://USER:PASSWORD@localhost:5432/DB?schema=public`
(URL-encode special characters in the password, e.g. `@` as `%40`).

**Never commit `.env` or real credentials.**

## Scripts
| Script | Purpose |
|---|---|
| `npm run start:dev` | Run API in watch mode |
| `npm run start:worker` | Run worker (after build) |
| `npm run build` | Compile |
| `npm run lint` / `typecheck` | Static checks |
| `npm test` / `test:e2e` | Unit / e2e tests |
| `npm run prisma:migrate` / `prisma:deploy` | Dev / deploy migrations |

Frontend lives in the separate `ilmora-frontend` repository.
