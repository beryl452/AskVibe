import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Responsibility from '#events/models/authorization/responsibility'

export default class Resource extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare HTTP_method: string

  @column()
  declare uri: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Responsibility, {
    pivotTable: 'responsability_resources',
  })
  declare responsabilities: ManyToMany<typeof Responsibility>
}
