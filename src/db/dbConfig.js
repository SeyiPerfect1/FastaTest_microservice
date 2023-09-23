const dbConfig = require("../config/config.js");
const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.user,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialet,
//   }
// );
console.log(dbConfig.user, dbConfig.password)
const sequelize = new Sequelize(
  `${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${+dbConfig.port}/${dbConfig.database}`
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Add our tables
db.user = require("../models/user.js")(sequelize, DataTypes);
// db.authors = require("./author")(sequelize, DataTypes);
// db.bookAuthors = require("./bookAuthors")(sequelize, DataTypes);

// sync all models
// force: false will not drop the table if it already exists
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables synced");
  })
  .catch((err) => {
    console.error("Unable to sync database & tables:", err);
  });

//Add many-to-many relationship between authors and books using a through table called BookAuthors
// db.books.belongsToMany(db.authors, { through: db.bookAuthors });
// db.authors.belongsToMany(db.books, { through: db.bookAuthors });

module.exports = db;
