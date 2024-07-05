import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.text('content', 'longtext').notNullable()
      table
        .enu('status', ['DRAFT', 'PUBLISHED', 'ARCHIVED'], {
          useNative: true,
          enumName: 'post_status',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('DRAFT')
      table.uuid('postable_id').nullable().references('posts.id').onDelete('CASCADE')
      table
        .enu('postable_type', ['Question', 'Answer'], {
          useNative: true,
          enumName: 'postable_type',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('Question')
        .notNullable()
      table.uuid('created_by').references('participes.id').onDelete('CASCADE')
      table.uuid('relative_to').references('talks.id').onDelete('CASCADE').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
