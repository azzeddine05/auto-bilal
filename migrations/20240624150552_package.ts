// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('packages', (table) => {
    table.increments('id')

    table.string('name').notNullable()
    table.string('description').notNullable()
    table.integer('price').notNullable()
    table.json('features').notNullable().defaultTo('[]')

    table.integer('total_cars').notNullable()
    table.integer('total_drivers').notNullable()

    table.boolean('is_active').notNullable().defaultTo(true)

    table.timestamps(true, true)

  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('packages')
}
