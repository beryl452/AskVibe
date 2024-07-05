import { HttpContext } from '@adonisjs/core/http'
import Vote from '../models/vote.js'
import Post from '#posts/models/post'
import Participe from '#events/models/participe'

export default class StoreVoteService {
  constructor(private ctx: HttpContext) {}

  async handle(voteData: any) {
    const { auth } = this.ctx

    const post = await Post.findOrFail(voteData.postableId)
    const participant = await Participe.query()
      .where({ userId: auth.user!.id, eventId: post.talk.eventId })
      .firstOrFail()

    return await Vote.create({
      voteType: voteData.voteType,
      postableId: voteData.postableId,
      participeId: participant.id,
    })
  }
}
