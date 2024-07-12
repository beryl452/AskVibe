import Vote from '#vote/models/vote'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Post from '#posts/models/post'
import Talk from '#talks/models/talk'
import Participe from '#events/models/participe'

@inject()
export default class UpdateVoteService {
  constructor(private ctx: HttpContext) {}

  async handle(voteData: any) {
    const { auth } = this.ctx
    const post = await Post.findOrFail(voteData.postableId)

    const talk = await Talk.findOrFail(post.relativeTo)

    const participant = await Participe.query()
      .where({ userId: auth.user!.id, eventId: talk.eventId })
      .firstOrFail()

    const vote = await Vote.findOrFail(voteData.voteId)
    if (vote.participeId !== participant.id) {
      throw new Error('You are not allowed to update this vote')
    }

    return await vote
      .merge({
        voteType: voteData.voteType,
      })
      .save()
  }
}
