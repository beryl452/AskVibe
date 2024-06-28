import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table
        .enu('vote_type', ['UPVOTE', 'DOWNVOTE'], {
          useNative: true,
          enumName: 'vote_type',
          existingType: false,
          schemaName: 'public',
        })
        .notNullable()
      table.uuid('postable_id').references('posts.id').onDelete('CASCADE')
      table.uuid('participe_id').references('participes.id').onDelete('CASCADE')

      table.timestamp('created_at ')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
