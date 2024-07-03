import StoreTalkRequest from '#talks/requests/store_talk_request'
import StoreTalkService from '#talks/services/store_talk_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoreTalkController {
  constructor(
    private storeTalkRequest: StoreTalkRequest,
    private storeTalkService: StoreTalkService
  ) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('talks/store')
  }

  async execute({ response }: HttpContext) {
    try {
      const talkData = await this.storeTalkRequest.handle()
      await this.storeTalkService.handle(talkData)
      response.status(201).send({ message: 'Talk created successfully' })
    } catch (error) {
      response.status(400).send({ message: error.messages || error.message })
    }
  }
}
