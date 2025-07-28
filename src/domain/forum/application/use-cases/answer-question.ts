import { type Either, right } from '~/core/either'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import type { AnswersRepository } from '~/domain/forum/application/repositories/answers-repository'
import { Answer } from '~/domain/forum/enterprise/entities/answer'
import { AnswerAttachment } from '~/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '~/domain/forum/enterprise/entities/answer-attachment-list'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: new UniqueEntityID(),
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    this.answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
