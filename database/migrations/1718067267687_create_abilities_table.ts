import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('name', 255).notNullable()
      table.string('HTTP_method', 255).notNullable()
      table.string('uri', 255).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.unique(['HTTP_method', 'uri'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
