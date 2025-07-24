import type { AnswerRepository } from '~/domain/forum/application/repositories/answer-repository'
import type { Answer } from '~/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
