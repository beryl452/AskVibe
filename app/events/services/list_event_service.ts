import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import Event from '#events/models/event'
import Participe from '#events/models/participe'

@inject()
export default class ListEventService {
  constructor(private ctx: HttpContext) {}

  async allPublic(parameters: { page: number; limit: number }) {
    return await Event.query()
      .where('isPublic', true)
      .preload('talks')
      .withCount('talks')
      .orderBy('createdAt', 'desc')
      .paginate(parameters.page, parameters.limit)
  }

  // async participateTo(parameters: { page: number; limit: number }) {
  //   const { auth } = this.ctx
  //
  //   const participant = await Participe.query().where({ userId: auth.user!.id }).preload('event')
  // }
}
