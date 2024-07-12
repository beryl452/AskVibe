// import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
// import Event from '#events/models/event'
import { inject } from '@adonisjs/core'
import Event from '#events/models/event'

@inject()
export class EventsPresenter {
  allPulic() {
    return Event.findManyBy('isPublic')
  }
  // constructor() {} // private paginatePresenter: PaginatePresenter
  // toJson(events: ModelPaginatorContract<Event>) {
  //   return {
  //     data: events.map((event) => {
  //       return {
  //         id: event.id,
  //         title: event.title,
  //         description: event.description,
  //         startDate: event.startDate.toISO(),
  //         endDate: event.endDate.toISO(),
  //         location: event.location,
  //         cover: event.cover,
  //         createdAt: event.createdAt.toISO(),
  //         updatedAt: event.updatedAt.toISO(),
  //       }
  //     }),
  //     meta: this.paginatePresenter.toJson(events),
  //   }
  // }
}
