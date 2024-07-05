import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Role from '#auth/models/role'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Ability extends BaseModel {
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

  @manyToMany(() => Role, {
    pivotTable: 'role_abilities',
  })
  declare roles: ManyToMany<typeof Role>
}
