import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'
import { PostableType } from '#enums/postable_type'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @hasMany(() => Post, {
    foreignKey: 'postableId',
    onQuery: (query) => query.where('postable_type', PostableType.QUESTION),
  })
  declare post: HasMany<typeof Post>
}
