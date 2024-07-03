import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#auth/models/user'
import Talk from './talk.js'

export default class Collaborate extends BaseModel {
  @column({ isPrimary: true })
  declare talkId: string

  @column({ isPrimary: true })
  declare userId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Talk)
  declare talk: BelongsTo<typeof Talk>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
