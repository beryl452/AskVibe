import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { PostableStatus } from '#enums/postable_status'
import { PostableType } from '#enums/postable_type'
import Vote from '#models/vote'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>
}
