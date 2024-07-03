import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { TalkStatus } from '../enums/talk_status.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Event from '#events/models/event'
import User from '#auth/models/user'

export default class Talk extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare talkStatus: TalkStatus

  @column()
  declare duration: number

  @column.date()
  declare startDateTime: DateTime

  @column.date()
  declare endDateTime: DateTime

  @column()
  declare location: string

  @column()
  declare eventId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'collaborates',
  })
  declare users: ManyToMany<typeof User>

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>

  @beforeCreate()
  static async setDuration(talk: Talk) {
    if (!talk.duration) {
      talk.duration = talk.startDateTime.diff(talk.endDateTime, 'minutes').as('minutes')
    }
  }
}
