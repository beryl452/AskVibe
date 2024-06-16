import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { TalkStatus } from '#enums/talk_status'

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

  @column()
  declare startDateTime: DateTime

  @column()
  declare endDateTime: DateTime

  @column()
  declare location: string

  @column()
  declare speakerId: string

  @column()
  declare eventId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
