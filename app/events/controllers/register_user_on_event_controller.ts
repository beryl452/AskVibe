import RegisterUserOnEventRequest from '#events/requests/register_user_on_event_request'
import RegisterUserOnEventService from '#events/services/register_user_on_event_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RegisterUserOnEventController {
  constructor(
    private registerUserOnEventRequest: RegisterUserOnEventRequest,
    private registerUserOnEventService: RegisterUserOnEventService
  ) {}

  async execute({ response }: HttpContext) {
    try {
      const data = await this.registerUserOnEventRequest.handle()
      await this.registerUserOnEventService.handle(data)
      response.status(201).send({ message: 'User registered on event successfully' })
    } catch (error) {
      response.status(400).send({ message: error.messages || error.message })
    }
  }
}
