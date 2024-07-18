// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')

    // Pays d'immatriculation *
    table.string('registration_country').notNullable()
    // Plaque d'immatriculation *
    table.string('plate_number').notNullable()
    // Marque
    table.string('brand').notNullable()
    // Modèle
    table.string('model').notNullable()

    // Référence 1
    table.string('reference_1').nullable()
    // Référence 2
    table.string('reference_2').nullable()
    // Commentaire
    table.string('comment').nullable()

    // Date d'entrée en parc *
    table.date('entry_date').notNullable()
    // Date de sortie du parc
    table.date('exit_date').nullable()

    // Entité de rattachement *
    table.integer('entity_id').unsigned().references('entities.id')
    
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('car_drivers')
  await knex.schema.dropTable('cars')
}
