// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('drivers', (table) => {
    table.increments('id')

    table.string('civility').nullable()
    table.string('first_name').nullable()
    table.string('last_name').nullable()

    table.dateTime('birth_date').nullable()
    table.string('birth_place').nullable()

    table.string('company_name').nullable()
    table.string('siren').nullable()
    table.string('siret').nullable()
    
    table.enum('type', ['physical', 'moral']).notNullable().defaultTo('physical')

    table.integer('entity_id').unsigned().references('id').inTable('entities')
    table.string('professional_email').notNullable()
    table.string('personal_email').nullable()

    table.string('address').notNullable()
    table.string('postal_code').notNullable()
    table.string('city').notNullable()
    table.string('country').notNullable()

    table.string('plate_number').nullable()
    table.string('reference_1').nullable()
    table.string('reference_2').nullable()
    table.string('comment').nullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('drivers')
}
