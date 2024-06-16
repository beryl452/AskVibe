import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Event from '#models/event'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

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

  @manyToMany(() => Event, {
    pivotTable: 'event_users',
    pivotColumns: ['role_id'],
  })
  declare events: ManyToMany<typeof Event>
}
