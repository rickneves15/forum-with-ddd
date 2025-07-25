import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answers-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  test('it should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-id'),
      })
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-id'),
      })
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-id'),
      })
    )

    const { answersComments } = await sut.execute({
      answerId: 'answer-id',
      page: 1,
    })

    expect(answersComments).toHaveLength(3)
    expect(answersComments).toEqual(
      expect.arrayContaining([expect.any(Object)])
    )
  })

  test('it should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-id'),
        })
      )
    }

    const { answersComments } = await sut.execute({
      answerId: 'answer-id',
      page: 2,
    })

    expect(answersComments).toHaveLength(2)
  })
})
