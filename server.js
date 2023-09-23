// import { connectToMongoDB } from ('./src/db/dbConfig');
const app = require("./app.js");
require('dotenv').config()
const db = require('./models/index.js')

const PORT = process.env.PORT || 8000;

// an async function to run migrations
async function runMigrations() {
  try {
    await db.sequelize.sync(); // This will apply pending migrations
    console.log('Database migrations completed successfully.');
  } catch (error) {
    console.error('Error running database migrations:', error);
  }
}

// Run migrations and start the server when migrations are completed
runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
  });
});



