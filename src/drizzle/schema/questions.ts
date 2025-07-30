import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { users } from './users'

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  slug: varchar('slug').notNull().unique(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date()),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})
