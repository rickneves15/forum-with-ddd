import type { AnswerComment } from '~/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComments: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
