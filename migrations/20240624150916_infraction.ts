// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('infractions', (table) => {
    table.increments('id')
    // DOSSIER N°
    table.string('dossier_number').notNullable()
    // DATE DE L'AVIS
    table.date('advice_date').notNullable()
    // DATE INFRACTION
    table.date('infraction_date').notNullable()
    // IMMAT
    table.string('plate_number').notNullable()
    // MODÈLE
    table.string('model').notNullable()
    // DESCRIPTION
    table.string('description').notNullable()
    // DATE DE RÉPONSE
    table.date('response_date').nullable()
    // UTILISATEUR
    table.string('user').notNullable()
    // RÉPONSE
    table.string('response').nullable()

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('infractions')
}
