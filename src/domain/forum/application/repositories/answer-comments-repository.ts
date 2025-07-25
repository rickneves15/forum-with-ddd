import type { PaginationParams } from '~/core/repositories/pagination-params'
import type { AnswerComment } from '~/domain/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]>
  create(answerComments: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
