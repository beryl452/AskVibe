import StoreQuestionService from '#posts/services/store_question_service'
import { HttpContext } from '@adonisjs/core/http'
import StoreQuestionRequest from '#posts/requests/store_question_request'
import { inject } from '@adonisjs/core'

@inject()
export default class StoreQuestionController {
  constructor(
    private storeQuestionRequest: StoreQuestionRequest,
    private storeQuestionService: StoreQuestionService
  ) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('posts/questions/store')
  }

  async execute({ response }: HttpContext) {
    try {
      const questionData = await this.storeQuestionRequest.handle()
      await this.storeQuestionService.handle(questionData)
      response.status(201).send({ message: 'Question created successfully' })
    } catch (error) {
      console.log(error)
      response.status(400).send({ message: error.messages || error.messages })
    }
  }
}
