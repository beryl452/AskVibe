import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { VoteType } from '../enums/vote_type.js'
import { inject } from '@adonisjs/core'

@inject()
export default class UpdateVoteRequest {
  constructor(private ctx: HttpContext) {}

  validator = vine.compile(
    vine.object({
      voteType: vine.enum(VoteType),
      postableId: vine.string().uuid().isExists({
        table: 'posts',
        column: 'id',
      }),
      voteId: vine.string().uuid().isExists({
        table: 'votes',
        column: 'id',
      }),
    })
  )

  async handle() {
    const { params, request } = this.ctx
    // const voteData = request.only(['voteType', 'postableId'])
    const voteData = {
      voteType: params.voteType,
      postableId: params.postableId,
      voteId: params.voteId,
    }
    return request.validateUsing(this.validator, {
      data: {
        ...voteData,
      },
    })
  }
}
