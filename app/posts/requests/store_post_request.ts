import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import { PostableStatus } from '#posts/enums/postable_status'
import { PostableType } from '#posts/enums/postable_type'

@inject()
export default class StorePostRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      content: vine.string().trim().minLength(10),
      status: vine.enum(PostableStatus),
      postable_id: vine.string().uuid().isExists({ table: 'posts', column: 'id' }).optional(),
      postable_type: vine.enum(PostableType),
      created_by: vine.string().uuid().isExists({ table: 'participes', column: 'id' }),
      relative_to: vine.string().uuid().isExists({ table: 'talks', column: 'id' }),
    })
  )

  async handle() {
    const { request } = this.ctx
    const eventData = request.only(['content', 'status', 'postable_id', 'postable_type'])

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
