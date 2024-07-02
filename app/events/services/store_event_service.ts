import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Event from '#events/models/event'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'

@inject()
export default class StoreEventService {
  constructor(private ctx: HttpContext) {}

  async handle(eventData: any) {
    const { request } = this.ctx
    const cover = request.file('cover')

    if (cover) {
      await cover.move(app.makePath('uploads/events'), {
        name: `${cuid()}.${cover.extname}`,
      })
    }

    return Event.create({
      title: eventData.title,
      description: eventData.description,
      startDate: eventData.start_date,
      endDate: eventData.end_date,
      location: eventData.location,
      isPublic: eventData.is_public,
      organizerId: eventData.organizer_id,
      cover: cover?.fileName,
    })
  }
}
