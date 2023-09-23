require('dotenv').config()

const CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
};

module.exports = CONFIG;
