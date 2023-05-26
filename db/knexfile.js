// Update with your config settings.

const knexStringcase = require("knex-stringcase");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: knexStringcase({
    client: "postgresql",
    connection: {
      database: "bugtracker",
      user: "postgres",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  }),

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
