import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('event_id').references('events.id').onDelete('CASCADE')
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.uuid('responsability_id').references('responsabilities.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['event_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
