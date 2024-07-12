import StoreVoteRequest from '#vote/requests/store_vote_request'
import { inject } from '@adonisjs/core'
import StoreVoteService from '#vote/services/store_vote_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoreVoteController {
  constructor(
    private storeVoteRequest: StoreVoteRequest,
    private storeVoteService: StoreVoteService
  ) {}

  async execute({ response }: HttpContext) {
    try {
      const voteData = await this.storeVoteRequest.handle()
      await this.storeVoteService.handle(voteData)
      response.status(201).send({ message: 'Vote created successfully' })
    } catch (error) {
      console.log(error)
      response.status(400).send({ message: error.messages || error.messages })
    }
  }
}
