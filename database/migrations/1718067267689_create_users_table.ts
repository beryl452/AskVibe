import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('full_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('profession').nullable()
      table.string('github_username').notNullable().unique()
      table.string('avatar_url', 255).notNullable()
      table.string('oauth_provider_id').notNullable()
      table.string('oauth_provider_name').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['oauth_provider_id', 'oauth_provider_name'])

      table.uuid('role_id').references('roles.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
