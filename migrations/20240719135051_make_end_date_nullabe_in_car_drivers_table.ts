import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('car_drivers', table => {
        table.date('end_date').nullable().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('car_drivers', table => {
        table.date('end_date').notNullable().alter();
    });
}

