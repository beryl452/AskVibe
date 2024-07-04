import StoreEventRequest from '#events/requests/store_event_request'
import StoreEventService from '#events/services/store_event_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoreEventController {
  constructor(
    private storeEventService: StoreEventService,
    private storeEventRequest: StoreEventRequest
  ) {}
  async render({ inertia }: HttpContext) {
    return inertia.render('events/store')
  }

  async execute({ response }: HttpContext) {
    try {
      const eventData = await this.storeEventRequest.handle()
      await this.storeEventService.handle(eventData)
      response.status(201).send({ message: 'Event created successfully' })
    } catch (error) {
      response.status(400).send({ message: error.messages || error.message })
    }
  }
}
