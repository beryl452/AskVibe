import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { VoteType } from '#enums/vote_type'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from '../posts/models/post.js'
import Participe from '#events/models/participe'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare voteType: VoteType

  @column()
  declare postableId: string

  @column()
  declare participeId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Participe)
  declare participe: BelongsTo<typeof Participe>

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>
}
