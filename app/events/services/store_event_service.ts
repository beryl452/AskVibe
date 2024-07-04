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

    const event = await Event.create({
      title: eventData.title,
      description: eventData.description,
      startDate: eventData.start_date,
      endDate: eventData.end_date,
      location: eventData.location,
      isPublic: eventData.is_public,
      cover: cover?.fileName,
    })

    await event.related('users').attach(eventData.organizer_ids)

    // TODO: Create the event's resources
    // TODO: Create organizer's responsability and assign it all resources

    return event
  }
}
