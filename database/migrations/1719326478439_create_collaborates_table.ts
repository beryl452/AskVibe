import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'collaborates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('talk_id').references('talks.id').onDelete('CASCADE')
      table.uuid('user_id').references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.primary(['talk_id', 'user_id']).unique(['talk_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
