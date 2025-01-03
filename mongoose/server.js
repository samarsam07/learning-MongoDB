const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8082 || process.env.PORT;
// connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(
      
    );
    console.log("connected to the database");
  } catch (err) {
    console.log("error connecting to the database", err.message);
  }
};

connectDB();
// ! create a schema
const userProfileSchema = new mongoose.Schema({
  userName: String,
  dob: Date,
  isActive: Boolean,
  email: String,
  interest: [String],
  objectId: mongoose.Schema.Types.ObjectId,
  address: {
    street: String,
    city: String,
    pincode: Number,
  }, //embeded
  customData: mongoose.Schema.Types.Mixed,
});
// model
const User = mongoose.model("User", userProfileSchema);
//!-----------------Create operation---------------
// ?save()
// const newUser = new User({
//   userName: "bongbong",
//   dob: new Date("2005-9-9"),
//   isActive: true,
//   email: "boogboog@gamil.com",
//   interest: ["coding", "reading"],
//   objectId: new mongoose.Types.ObjectId(),
//   address: {
//     street: "bong street",
//     city: "bong city",
//     pincode: 123456,
//   },
//   customData: {
//     key1: "value1",
//     key2: "value2",
//   },
// });
// // save the document
// newUser
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// ?create()
// User.create({
//   userName: "billaDon",
//   dob: new Date("2004-2-6"),
//   isActive: true,
//   email: "billa@gamil.com",
//   interest: ["coding", "reading"],
//   objectId: new mongoose.Types.ObjectId(),
//   address: {
//     street: "billa street",
//     city: "bong city",
//     pincode: 123556,
//   },
//   customData: {
//     key1: "value1",
//     key2: "value2",
//   },
// }).then((data)=>console.log(data)).catch((err)=>console.log(err.message));
// ?insertMany()
User.insertMany([
  {
    userName: "silu",
    dob: new Date("2005-9-9"),
    isActive: true,
    email: "silu@gamil.com",
    interest: ["coding", "reading"],
    objectId: new mongoose.Types.ObjectId(),
    address: {
      street: "bong street",
      city: "bong city",
      pincode: 123456,
    },
    customData: {
      key1: "value1",
      key2: "value2",
    },
  },
  {
    userName: "chotuchai",
    dob: new Date("2005-9-9"),
    isActive: true,
    email: "chotuchai@gamil.com",
    interest: ["chai making", "chai drinking"],
    objectId: new mongoose.Types.ObjectId(),
    address: {
      street: "bong street",
      city: "bona city",
      pincode: 333456,
    },
    customData: {
      key1: "value1",
      key2: "value2",
    },
  },
])
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message));

// start the server
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`);
});
