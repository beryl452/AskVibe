import UpdateVoteRequest from '#vote/requests/update_vote_request'
import { inject } from '@adonisjs/core'
import UpdateVoteService from '#vote/services/update_vote_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UpdateVoteController {
  constructor(
    private updateVoteRequest: UpdateVoteRequest,
    private updateVoteService: UpdateVoteService
  ) {}

  async execute({ response }: HttpContext) {
    try {
      const voteData = await this.updateVoteRequest.handle()
      await this.updateVoteService.handle(voteData)
      response.status(201).send({ message: 'Vote updated successfully' })
    } catch (error) {
      console.log(error)
      response.status(400).send({ message: error.messages || error.messages })
    }
  }
}
