import vine from '@vinejs/vine'
import BaseStorePostRequest from '#posts/requests/base_store_post_request'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { PostableType } from '#posts/enums/postable_type'

// TODO: Create Service and controller for create Answer

@inject()
export default class StoreAnswerRequest extends BaseStorePostRequest {
  constructor(private ctx: HttpContext) {
    super()
  }
  validator = vine.compile(
    vine.object({
      ...this.baseValidator,
      createdBy: vine.string().uuid().isExists({ table: 'participes', column: 'id' }),
      postableId: vine.string().uuid().isExists({ table: 'posts', column: 'id' }),
    })
  )

  async handle() {
    const { auth, request } = this.ctx
    const eventData = request.only(['content', 'status', 'postableId', 'postableType', 'createdBy'])

    eventData.createdBy = auth.user!.id

    if (eventData.postableType !== PostableType.ANSWER) {
      throw new Error(`Postable type must be ${PostableType.ANSWER}`)
    }

    return request.validateUsing(this.validator, {
      data: {
        ...eventData,
      },
    })
  }
}
