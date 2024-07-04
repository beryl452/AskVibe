import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'

@inject()
export default class StoreEventRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(3).maxLength(255),
      description: vine.string().trim().minLength(10),
      start_date: vine
        .date({
          formats: ['YYYY-MM-DD', 'x'],
        })
        .after('today')
        .transform((value) => {
          return DateTime.fromJSDate(value)
        }),
      end_date: vine
        .date({
          formats: ['YYYY-MM-DD', 'x'],
        })
        .afterField('start_date')
        .transform((value) => {
          return DateTime.fromJSDate(value)
        }),
      location: vine.string().trim().minLength(3).maxLength(255),
      cover: vine.file({
        size: '2mb',
        extnames: ['jpg', 'jpeg', 'png'],
      }),
      is_public: vine.boolean(),

      organizer_ids: vine.array(
        vine.string().uuid().isExists({
          table: 'users',
          column: 'id',
        })
      ),
    })
  )

  async handle() {
    const { auth, request } = this.ctx
    const eventData = request.only([
      'title',
      'description',
      'start_date',
      'end_date',
      'location',
      'cover',
      'is_public',
      'organizer_ids',
    ])

    if (request.file('cover')) {
      eventData.cover = request.file('cover')
    }
    if (typeof eventData.is_public === 'string') {
      eventData.is_public = eventData.is_public === '1'
    }

    if (eventData.start_date) {
      eventData.start_date = DateTime.fromISO(eventData.start_date, {
        setZone: true,
      }).toMillis()
    }

    if (eventData.end_date) {
      eventData.end_date = DateTime.fromISO(eventData.end_date, { setZone: true }).toMillis()
    }

    if (!eventData.organizer_ids) {
      typeof eventData.organizer_ids === 'object'
        ? eventData.organizer_ids.push(auth.user!.id)
        : (eventData.organizer_ids = [auth.user!.id])
    }

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
