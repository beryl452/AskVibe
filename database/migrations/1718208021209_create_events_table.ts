import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('title', 255).notNullable()
      table.text('description', 'longtext').notNullable()
      table.dateTime('start_date', { useTz: true }).notNullable()
      table.dateTime('end_date', { useTz: true }).notNullable()
      table.string('location', 255).notNullable()
      table.string('cover', 255).notNullable()
      table.boolean('is_public').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
