import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { PostableStatus } from '#posts/enums/postable_status'
import { PostableType } from '#posts/enums/postable_type'
import Vote from '#models/vote'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Participe from '#events/models/participe'
import Talk from '#talks/models/talk'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare content: string

  @column()
  declare status: PostableStatus

  @column()
  declare postableId: string | null

  @column()
  declare postableType: PostableType

  @column()
  declare createdBy: string

  @column()
  declare relativeTo: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>

  @belongsTo(() => Participe, {
    foreignKey: 'createdBy',
  })
  declare creator: BelongsTo<typeof Participe>

  @belongsTo(() => Talk, {
    foreignKey: 'relativeTo',
  })
  declare talk: BelongsTo<typeof Talk>
}
