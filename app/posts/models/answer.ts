import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Question from './question.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import { PostableType } from '#posts/enums/postable_type'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @belongsTo(() => Question, {
    foreignKey: 'postableId',
  })
  declare question: BelongsTo<typeof Question>

  @hasOne(() => Post, {
    foreignKey: 'postableId',
    onQuery: (query) => query.where('postable_type', PostableType.ANSWER),
  })
  declare post: HasOne<typeof Post>
}
