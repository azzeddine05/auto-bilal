// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('car_drivers', (table) => {
    table.increments('id')

    table.integer('car_id').unsigned().references('id').inTable('cars')
    table.integer('driver_id').unsigned().references('id').inTable('drivers')

    table.unique(['car_id', 'driver_id'])

    table.date('start_date').notNullable()
    table.date('end_date').nullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('car_drivers')
}
