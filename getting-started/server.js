const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 3000;
// user::samarmohd251
// password::fziRniuPfa4op4uX
// db url:mongodb+srv://samarmohd251:fziRniuPfa4op4uX@learning.18puu.mongodb.net/student-database
const client = new MongoClient(
  "mongodb+srv://samarmohd251:fziRniuPfa4op4uX@learning.18puu.mongodb.net/student-database",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

// function to connect to the database
const connectDB = async () => {
  try {
    await client.connect();
    console.log("connected to the database");
  } catch (err) {
    console.log(err.message);
  }
};
// call the function
connectDB();
// route

// start server
app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
