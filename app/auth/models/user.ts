import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Event from '#events/models/event'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#auth/models/role'
import Talk from '../../talks/models/talk.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column()
  declare profession: string

  @column()
  declare githubUsername: string

  @column()
  declare avatarUrl: string

  @column({ serializeAs: null })
  declare oauthProviderId: string

  @column({ serializeAs: null })
  declare oauthProviderName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @manyToMany(() => Event, {
    localKey: 'id',
    pivotTable: 'participes',
    pivotColumns: ['votes', 'responsibility'],
    pivotTimestamps: true,
  })
  declare events: ManyToMany<typeof Event>

  @manyToMany(() => Talk, {
    pivotTable: 'collaborates',
    pivotTimestamps: true,
  })
  declare talks: ManyToMany<typeof Talk>
}
