import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Event from '#models/event'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Talk from '#models/talk'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
    pivotTable: 'participes',
    // pivotColumns: ['role_id'],
  })
  declare events: ManyToMany<typeof Event>

  @manyToMany(() => Talk, {
    pivotTable: 'collaborates',
  })
  declare talks: ManyToMany<typeof Talk>

  @hasMany(() => Event)
  declare organizedEvents: HasMany<typeof Event>
}
