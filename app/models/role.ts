import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Event from '#models/event'
import Ability from '#models/ability'
import EventUser from '#models/event_user'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare eventId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>

  @manyToMany(() => Ability, {
    pivotTable: 'role_abilities',
  })
  declare abilities: ManyToMany<typeof Ability>

  @hasMany(() => EventUser)
  declare eventUsers: HasMany<typeof EventUser>
}
