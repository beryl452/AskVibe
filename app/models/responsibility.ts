import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Resource from '#models/resource'
import Participe from '#events/models/participe'
import Event from '#events/models/event'

export default class Responsibility extends BaseModel {
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

  @hasMany(() => Participe)
  declare participes: HasMany<typeof Participe>

  @manyToMany(() => Resource, {
    pivotTable: 'responsability_resources',
  })
  declare resources: ManyToMany<typeof Resource>

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>
}
