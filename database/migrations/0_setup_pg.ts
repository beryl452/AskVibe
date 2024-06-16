import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users' // can be any table, it doesn't matter

  async up() {
    await this.db.rawQuery(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";'
    )
  }

  async down() {
    await this.db.rawQuery('DROP EXTENSION IF EXISTS "uuid-ossp";')
  }
}
