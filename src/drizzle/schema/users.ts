import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
})
