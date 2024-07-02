import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import Event from '#events/models/event'
import { PaginatePresenter } from '#presenters/paginate_presenter'
import { inject } from '@adonisjs/core'

@inject()
export class EventsPresenter {
  constructor(private paginatePresenter: PaginatePresenter) {}
  toJson(events: ModelPaginatorContract<Event>) {
    return {
      data: events.map((event) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISO(),
          endDate: event.endDate.toISO(),
          location: event.location,
          cover: event.cover,
          createdAt: event.createdAt.toISO(),
          updatedAt: event.updatedAt.toISO(),
        }
      }),
      meta: this.paginatePresenter.toJson(events),
    }
  }
}
