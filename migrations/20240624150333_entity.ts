// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('entities', (table) => {
    table.increments('id')

    table.string('name').notNullable()
    table.string('siren').nullable()
    table.string('siret').nullable()
    table.string('email').nullable()
    table.string('address').notNullable()
    table.string('postal_code').notNullable()
    table.string('city').notNullable()
    table.string('country').notNullable()
    table.string('logo').nullable()

    table.string('representative_first_name').nullable()
    table.string('representative_last_name').nullable()
    table.string('representative_email').nullable()

    table.integer('parent_id').unsigned().references('entities.id').nullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('entities')
}
