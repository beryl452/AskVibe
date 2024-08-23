import { EventsPresenter } from '#events/presenters/events_presenter'
import ListEventRequest from '#events/requests/list_event_request'
import ListEventService from '#events/services/list_event_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ListEventController {
  constructor(
    private listEventService: ListEventService,
    private listEventRequest: ListEventRequest,
    private eventsPresenter: EventsPresenter
  ) {}
  async render({ inertia }: HttpContext) {
    const parameters = await this.listEventRequest.handle()
    const events = await this.listEventService.allPublic({
      page: parameters.page || 1,
      limit: parameters.limit || 10,
    })

    return inertia.render('events/index', { events: this.eventsPresenter.toJson(events) })
  }
}
