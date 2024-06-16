import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_abilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('role_id').references('roles.id').onDelete('CASCADE')
      table.uuid('ability_id').references('abilities.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.primary(['role_id', 'ability_id']).unique(['role_id', 'ability_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
