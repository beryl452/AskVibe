import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Talk from '#talks/models/talk'
import Participe from '#events/models/participe'
import Post from '#posts/models/post'

@inject()
export default class StoreQuestionService {
  constructor(private ctx: HttpContext) {}
  async handle(questionData: any) {
    const { auth } = this.ctx

    const talk = await Talk.findOrFail(questionData.relativeTo)

    const participant = await Participe.query()
      .where({ userId: auth.user!.id, eventId: talk.eventId })
      .firstOrFail()

    return await Post.create({
      content: questionData.content,
      status: questionData.status,
      postableType: questionData.postableType,
      createdBy: participant.id,
    })
  }
}
