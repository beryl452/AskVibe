import StoreVoteRequest from '../requests/store_vote_request.js'
import { inject } from '@adonisjs/core'
import StoreVoteService from '../services/store_vote_service.js'
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
      response.status(400).send({ message: error.messages || error.messages })
    }
  }
}
