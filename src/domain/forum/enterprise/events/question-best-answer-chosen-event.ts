import type { UniqueEntityID } from '~/core/entities/unique-entity-id'
import type { DomainEvent } from '~/core/events/domain-event'
import type { Question } from '~/domain/forum/enterprise/entities/question'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public occurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityID

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id
  }
}
