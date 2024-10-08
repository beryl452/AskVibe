import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'responsabilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('name', 100).notNullable()
      table.string('description', 255).notNullable()

      table.uuid('event_id').references('events.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['name', 'event_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
