import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Question from './question.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import { PostableType } from '#posts/enums/postable_type'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @belongsTo(() => Question, {
    foreignKey: 'postableId',
  })
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => Post, {
    foreignKey: 'postableId',
    onQuery: (query) => query.where('postable_type', PostableType.QUESTION),
  })
  declare post: BelongsTo<typeof Post>
}
