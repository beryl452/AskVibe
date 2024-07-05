import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { VoteType } from '../enums/vote_type.js'
import { inject } from '@adonisjs/core'

@inject()
export default class StoreVoteRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      voteType: vine.enum(VoteType),
      postableId: vine.string().uuid().isExists({
        table: 'posts',
        column: 'id',
      }),
    })
  )

  async handle() {
    const { request } = this.ctx
    const voteData = request.only(['voteType', 'postableId'])
    return request.validateUsing(this.validator, {
      data: {
        ...voteData,
      },
    })
  }
}
