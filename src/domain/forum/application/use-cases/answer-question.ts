import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import type { AnswerRepository } from '~/domain/forum/application/repositories/answers-repository'
import { Answer } from '~/domain/forum/enterprise/entities/answer'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    this.answerRepository.create(answer)

    return { answer }
  }
}
