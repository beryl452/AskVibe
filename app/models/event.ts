import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import User from '#models/user'
import Talk from '#models/talk'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare location: string

  @column()
  declare cover: string

  @column()
  declare isPublic: boolean

  @column()
  declare organizerId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Role)
  declare roles: HasMany<typeof Role>

  @manyToMany(() => User, {
    pivotTable: 'participes',
    pivotColumns: ['votes', 'responsibility'],
  })
  declare users: ManyToMany<typeof User>

  @hasMany(() => Talk)
  declare talk: HasMany<typeof Talk>

  @belongsTo(() => User)
  declare organizer: BelongsTo<typeof User>
}
