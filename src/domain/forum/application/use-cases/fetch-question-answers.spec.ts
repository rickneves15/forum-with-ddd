import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  test('it should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-id'),
      })
    )

    const { answers } = await sut.execute({
      questionId: 'question-id',
      page: 1,
    })

    expect(answers).toHaveLength(3)
    expect(answers).toEqual(expect.arrayContaining([expect.any(Object)]))
  })

  test('it should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-id'),
        })
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-id',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
