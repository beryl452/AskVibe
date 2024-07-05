import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import { PostableType } from '#posts/enums/postable_type'
import Answer from '#posts/models/answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @hasOne(() => Post, {
    foreignKey: 'postableId',
    onQuery: (query) => query.where('postableType', PostableType.QUESTION),
  })
  declare post: HasOne<typeof Post>

  @hasMany(() => Answer)
  declare answers: HasMany<typeof Answer>
}
