import type { Question } from '~/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  create(answer: Question): Promise<void>
}
