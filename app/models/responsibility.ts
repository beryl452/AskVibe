import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Resource from '#models/resource'
import Participe from '#models/participe'

export default class Responsibility extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

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
}
