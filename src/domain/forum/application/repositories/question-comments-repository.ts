import type { PaginationParams } from '~/core/repositories/pagination-params'
import type { QuestionComment } from '~/domain/forum/enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
