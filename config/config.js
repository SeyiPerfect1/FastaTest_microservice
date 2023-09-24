require("dotenv").config();

const CONFIG = {
  development: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    port: `${process.env.DB_PORT}`,
    host: `${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
  },
  test: {
    username: `${process.env.DB_USER_TEST}`,
    password: `${process.env.DB_PASSWORD_TEST}`,
    database: `${process.env.DB_NAME_TEST}`,
    port: `${process.env.DB_PORT_TEST}`,
    host: `${process.env.DB_HOST_TEST}`,
    dialect: `${process.env.DB_DIALECT_TEST}`,
  },
  production: {
    username: `${process.env.DB_USER_PRODUCTION}`,
    password: `${process.env.DB_PASSWORD_PRODUCTION}`,
    database: `${process.env.DB_NAME_PRODUCTION}`,
    port: `${process.env.DB_PORT_PRODUCTION}`,
    host: `${process.env.DB_HOST_PRODUCTION}`,
    dialect: `${process.env.DB_DIALECT_PRODUCTION}`,
  },
};

module.exports = CONFIG;
