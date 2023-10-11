const app = require("./app.js");
require("dotenv").config();
const db = require("./db/models/index.js");

const PORT = process.env.PORT || 5001;

// an async function to run migrations
async function runMigrations() {
  try {
    // apply pending migrations
    await db.sequelize.sync();
    console.log("Database migrations completed successfully.");
  } catch (error) {
    console.error("Error running database migrations:", error);
  }
}

// Run migrations and start the server when migrations are completed
runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
  });
});


module.exports = PORT;