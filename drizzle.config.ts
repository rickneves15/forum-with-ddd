import type { Config } from 'drizzle-kit'

export default {
  schema: 'src/drizzle/schema/*',
  out: 'src/drizzle/migrations',
  dialect: 'postgresql',
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config
