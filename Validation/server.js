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
// ! create a schema
const userProfileSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v);
        },
        message: "username should contain only alphabets and numbers",
      }, //!custom validation
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: /@/,
    },
    age: {
      type: Number,
      required: [true, "Please provide an age"],
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
  },
  {
    timestamps: true,
  }
);
// model
const User = mongoose.model("User", userProfileSchema);
// create document
const createDoc = async () => {
  try {
    const newUser = await User.create({
      userName: "sher",
      email: "sher123@gmail.com",
      age: 24,
      gender: "Male",
    });
    console.log(newUser);
  } catch (e) {
    console.log(e);
  }
};
createDoc(); //calling the function
// start the server
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`);
});
