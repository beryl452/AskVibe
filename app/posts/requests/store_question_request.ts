import vine from '@vinejs/vine'
import BaseStorePostRequest from '#posts/requests/base_store_post_request'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { PostableType } from '#posts/enums/postable_type'

@inject()
export default class StoreQuestionRequest extends BaseStorePostRequest {
  constructor(private ctx: HttpContext) {
    super()
  }
  validator = vine.compile(
    vine.object({
      ...this.baseValidator,
      relativeTo: vine.string().uuid().isExists({ table: 'talks', column: 'id' }),
    })
  )

  async handle() {
    const { request } = this.ctx
    const eventData = request.only(['content', 'status', 'relativeTo', 'postableType'])

    if (eventData.postableType !== PostableType.QUESTION) {
      throw new Error(`Postable type must be ${PostableType.ANSWER}`)
    }

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
