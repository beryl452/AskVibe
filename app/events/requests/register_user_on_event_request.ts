import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'

@inject()
export default class RegisterUserOnEventRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      event_id: vine.string().uuid().isExists({ table: 'events', column: 'id' }),
      user_id: vine.string().uuid().isExists({ table: 'users', column: 'id' }),
      responsability_id: vine.string().uuid().isExists({ table: 'responsabilities', column: 'id' }),
    })
  )

  async handle() {
    const { request } = this.ctx
    const eventData = request.only(['event_id', 'user_id', 'responsability_id'])

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
