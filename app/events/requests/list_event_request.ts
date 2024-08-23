import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'

@inject()
export default class ListEventRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      page: vine.number().min(1).optional(),
      limit: vine.number().min(1).optional(),
    })
  )

  async handle() {
    const { request } = this.ctx
    const parameters = request.only(['page', 'limit'])

    return request.validateUsing(this.validator, {
      data: {
        ...parameters,
      },
    })
  }
}
