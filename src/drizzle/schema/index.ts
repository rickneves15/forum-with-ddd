import { questions } from './questions'
import { users } from './users'

export const schema = {
  questions,
  users,
}

export type Schema = typeof schema
