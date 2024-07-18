// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()

    table.integer('role_id').unsigned().references('id').inTable('roles')
    table.integer('entity_id').unsigned().references('id').inTable('entities')

    // Notification de nouvelle infraction * (never, immediate, daily at 8:00am, weekly at 8:am)
    table.string('notification_new_infraction').notNullable()

    // 1er relance après
    table.integer('reminder_1').nullable()
    // 2eme relance après
    table.integer('reminder_2').nullable()

    // ou Relancer tous les
    table.integer('reminder_every').nullable()

    table.string('email').unique()
    table.string('password')

    table.boolean('is_active').defaultTo(true)

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
