import StoreAnswerService from '#posts/services/store_answer_service'
import { HttpContext } from '@adonisjs/core/http'
import StoreAnswerRequest from '#posts/requests/store_answer_request'
import { inject } from '@adonisjs/core'

@inject()
export default class StoreAnswerController {
  constructor(
    private storeAnswerRequest: StoreAnswerRequest,
    private storeAnswerService: StoreAnswerService
  ) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('posts/answers/store')
  }

  async execute({ response }: HttpContext) {
    try {
      const answerData = await this.storeAnswerRequest.handle()
      await this.storeAnswerService.handle(answerData)
      response.status(201).send({ message: 'Answer created successfully' })
    } catch (error) {
      response.status(400).send({ message: error.messages || error.messages })
    }
  }
}
