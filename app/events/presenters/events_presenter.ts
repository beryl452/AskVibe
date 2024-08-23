// import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
// import Event from '#events/models/event'
import { inject } from '@adonisjs/core'
import Event from '#events/models/event'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { PaginatePresenter } from '#core/presenters/paginate_presenter'

@inject()
export class EventsPresenter {
  // allPublic() {
  //   return Event.findManyBy('isPublic', true)
  // }
  constructor(private paginatePresenter: PaginatePresenter) {}

  toJson(events: ModelPaginatorContract<Event>) {
    return {
      data: events.all().map((event) => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          startDate: event.startDate.toISO(),
          endDate: event.endDate.toISO(),
          location: event.location,
          cover: '/uploads/events/' + event.cover,
          createdAt: event.createdAt.toISO(),
          updatedAt: event.updatedAt.toISO(),
        }
      }),
      meta: this.paginatePresenter.toJson(events),
    }
  }
}
