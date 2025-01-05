const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8082 || process.env.PORT;
// connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://samarmohd251:fziRniuPfa4op4uX@learning.18puu.mongodb.net/student-database"
    );
    console.log("connected to the database");
  } catch (err) {
    console.log("error connecting to the database", err.message);
  }
};

connectDB();
//! address schema
// const addressSchema = new mongoose.Schema(
//   {
//     street: String,
//     city: String,
//     state: String,
//     pincode: Number,
//   },
//   {
//     timestamps: true,
//   }
// );
// // user Schema
// const userschema = new mongoose.Schema(
//   {
//     username: String,
//     email: String,
//     address: [addressSchema],
//   },
//   {
//     timestamps: true,
//   }
// );
// // user model
// const User = new mongoose.model("user", userschema);
// // create a new user
// const createDoc = async () => {
//   try {
//     const newUser = await User.create({
//       username: "mugi",
//       email: "mugi123@gamil.com",
//       address: [{
//         street: "1234",
//         city: "mumbai",
//         state: "maharashtra",
//         pincode: 400001,
//       }],
//     });
//     console.log(newUser);
//   } catch (err) {
//     console.error("Error creating document", err.message);
//   }
// };
// // call the function
// createDoc();
// start the server
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`);
});
