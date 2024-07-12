import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PaginateRequest {
  constructor(private ctx: HttpContext) {}
  validator = vine.compile(
    vine.object({
      page: vine.number().optional(),
      limit: vine.number().optional(),
    })
  )

  async handle() {
    const { params, request } = this.ctx

    const parameters = {
      page: params.page,
      limit: params.limit,
    }
    return request.validateUsing(this.validator, {
      data: {
        ...parameters,
      },
    })
  }
}
