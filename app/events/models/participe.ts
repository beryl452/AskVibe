import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#auth/models/user'
import Event from '#events/models/event'
import Vote from '#models/vote'
import Responsibility from '#models/responsibility'

export default class Participe extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare eventId: string

  @column()
  declare userId: string

  @column()
  declare responsabilityId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @belongsTo(() => Responsibility)
  declare responsibility: BelongsTo<typeof Responsibility>
}
