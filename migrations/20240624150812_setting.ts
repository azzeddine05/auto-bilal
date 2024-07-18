// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('settings', (table) => {
    table.increments('id')

    // Délai de transmission des réponses
    table.integer('response_delay').notNullable().defaultTo(0)
    // Éditer le justificatif au nom de
    table.string('justification_name').notNullable().defaultTo('')

    // Inclure l’identité de la personne désignée (Nom Prénom ou Raison sociale)
    table.boolean('include_designated_person_identity').notNullable().defaultTo(false)
    // Inclure les coordonnées postales et électroniques de la personne désignée
    table.boolean('include_designated_person_contact').notNullable().defaultTo(false)
    // Autoriser l’authentification externe des dossiers 
    table.boolean('allow_external_authentication').notNullable().defaultTo(false)
    // Afficher l’identité (Nom Prénom ou Raison sociale) de la personne désignée
    table.boolean('display_designated_person_identity').notNullable().defaultTo(false)
    // Afficher les coordonnées postales et électroniques de la personne désignée
    table.boolean('display_designated_person_contact').notNullable().defaultTo(false)

    table.timestamps(true, true)
    
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('settings')
}
