// import { connectToMongoDB } from ('./src/db/dbConfig');
const app = require("./app.js");
require('dotenv').config()
const db = require("./src/db/dbConfig.js");

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
