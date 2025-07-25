import type { AnswerComment } from '~/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answerComments: AnswerComment): Promise<void>
}
