import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('drivers', table => {
        table.string('plate_number').nullable().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('drivers', table => {
        table.string('plate_number').notNullable().alter();
    });
}

