
exports.up = function(knex) {
    return knex.schema
    .createTable('user', (table) => {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('password').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('chef', (table) => {
        table.increments('id').primary();
        table.string('chefUserName').notNullable();
        table.string('chefPassword').notNullable();
        table.string('name').notNullable();
        table.string('about');
        table.string('pic1');
        table.string('pic2');
        table.string('pic3');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('food', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.string('pic');
        table.string('cuisine');
        table.string('chefId').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user').dropTable('chef').dropTable('food')
};
