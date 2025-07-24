import type { Answer } from '~/domain/entities/answer'
import type { AnswerRepository } from '~/domain/repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
