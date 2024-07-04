import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import dayjs from 'dayjs'

@inject()
export default class StoreTalkRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(3).maxLength(255),
      description: vine.string().trim().minLength(10),
      start_date_time: vine
        .date({
          formats: ['YYYY-MM-DD', 'x'],
        })
        .after('today')
        .transform((value) => {
          return DateTime.fromJSDate(value)
        }),
      end_date_time: vine
        .date({
          formats: ['YYYY-MM-DD', 'x'],
        })
        .afterField('start_date_time')
        .beforeOrEqual((field) => {
          return (
            DateTime.fromISO(
              dayjs(field.parent.start_date_time)
                .add(86400000, 'millisecond')
                .format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
              {
                setZone: true,
              }
            ).toSQL({ includeOffset: false }) as string
          ).split('.')[0]
        })
        .transform((value) => {
          return DateTime.fromJSDate(value)
        }),
      location: vine.string().trim().minLength(3).maxLength(255),

      event_id: vine.string().uuid().isExists({ table: 'events', column: 'id' }),
      collaborator_ids: vine.array(
        vine.string().uuid().isExists({
          table: 'users',
          column: 'id',
        })
      ),
    })
  )

  async handle() {
    const { request } = this.ctx
    const eventData = request.only([
      'title',
      'description',
      'start_date_time',
      'end_date_time',
      'location',
      'event_id',
      'collaborator_ids',
    ])

    if (eventData.start_date_time) {
      eventData.start_date_time = DateTime.fromISO(eventData.start_date_time, {
        setZone: true,
      }).toMillis()
    }

    if (eventData.end_date_time) {
      eventData.end_date_time = DateTime.fromISO(eventData.end_date_time, {
        setZone: true,
      }).toMillis()
    }

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
