import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Talk from '#talks/models/talk'
import Participe from '#events/models/participe'
import Post from '#posts/models/post'

@inject()
export default class StoreAnswerService {
  constructor(private ctx: HttpContext) {}
  async handle(answerData: any) {
    const { auth } = this.ctx

    const question = await Post.findOrFail(answerData.postableId)

    const talk = await Talk.findOrFail(question.relativeTo)

    const participant = await Participe.query()
      .where({ userId: auth.user!.id, eventId: talk.eventId })
      .firstOrFail()

    return await Post.create({
      content: answerData.content,
      status: answerData.status,
      postableType: answerData.postableType,
      createdBy: participant.id,
      postableId: answerData.postableId,
    })
  }
}
