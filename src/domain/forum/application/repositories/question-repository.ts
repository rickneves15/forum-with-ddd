import type { Question } from '~/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
}
