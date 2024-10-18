import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('entities', table => {
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('entities', table => {
        table.dropColumn('user_id')
    })
}

