import { HttpContext } from '@adonisjs/core/http'
import Vote from '#vote/models/vote'
import Post from '#posts/models/post'
import Participe from '#events/models/participe'
import { inject } from '@adonisjs/core'
import Talk from '#talks/models/talk'

@inject()
export default class StoreVoteService {
  constructor(private ctx: HttpContext) {}

  async handle(voteData: any) {
    const { auth } = this.ctx

    const post = await Post.findOrFail(voteData.postableId)

    const talk = await Talk.findOrFail(post.relativeTo)

    const participant = await Participe.query()
      .where({ userId: auth.user!.id, eventId: talk.eventId })
      .firstOrFail()

    const hasVoted = await Vote.query()
      .where({
        postableId: voteData.postableId,
        participeId: participant.id,
      })
      .first()

    if (hasVoted) {
      throw new Error('You have already voted')
    }

    return await Vote.create({
      voteType: voteData.voteType,
      postableId: voteData.postableId,
      participeId: participant.id,
    })
  }
}
