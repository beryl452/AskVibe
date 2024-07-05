import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#auth/models/role'
import User from '#auth/models/user'
import Talk from '../../talks/models/talk.js'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Role)
  declare roles: HasMany<typeof Role>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotTable: 'participes',
    pivotColumns: ['id', 'votes', 'responsibility'],
    pivotTimestamps: true,
  })
  declare users: ManyToMany<typeof User>

  @hasMany(() => Talk)
  declare talk: HasMany<typeof Talk>
}
