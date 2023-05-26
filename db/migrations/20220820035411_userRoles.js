/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.schema.createTable("role", (table) => {
        table.increments("id").primary();
        table.integer("user_id").notNullable();
        table
          .foreign("user_id")
          .references("user.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("project_id").notNullable();
        table
          .foreign("project_id")
          .references("project.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.string("role").notNullable();
        table.timestamps(true, true);
      });

      resolve();
    } catch (err) {
      return reject(err);
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.schema.dropTable("role");
      resolve();
    } catch (err) {
      return reject(err);
    }
  });
};
