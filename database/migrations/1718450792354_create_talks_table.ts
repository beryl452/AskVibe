import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'talks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('title').notNullable()
      table.text('description', 'longtext').notNullable()
      table
        .enu('talk_status', ['PENDING', 'APPROVED', 'REJECTED', 'CANCELED'], {
          useNative: true,
          enumName: 'speaker_talk_status',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('PENDING')
      table.integer('duration').notNullable()
      table.dateTime('start_date_time', { useTz: true }).nullable()
      table.dateTime('end_date_time', { useTz: true }).nullable()
      table.string('location', 255).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.uuid('event_id').references('events.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "speaker_talk_status"')
    this.schema.dropTable(this.tableName)
  }
}
