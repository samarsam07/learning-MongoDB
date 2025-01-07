const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8082 || process.env.PORT;
// connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect();
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
// *const newUser = new User({
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
//* User.create({
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
//* User.insertMany([
//   {
//     userName: "silu",
//     dob: new Date("2005-9-9"),
//     isActive: true,
//     email: "silu@gamil.com",
//     interest: ["coding", "reading"],
//     objectId: new mongoose.Types.ObjectId(),
//     address: {
//       street: "bong street",
//       city: "bong city",
//       pincode: 123456,
//     },
//     customData: {
//       key1: "value1",
//       key2: "value2",
//     },
//   },
//   {
//     userName: "chotuchai",
//     dob: new Date("2005-9-9"),
//     isActive: true,
//     email: "chotuchai@gamil.com",
//     interest: ["chai making", "chai drinking"],
//     objectId: new mongoose.Types.ObjectId(),
//     address: {
//       street: "bong street",
//       city: "bona city",
//       pincode: 333456,
//     },
//     customData: {
//       key1: "value1",
//       key2: "value2",
//     },
//   },
// ])
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
//!-----------------Read operation---------------
// ?find()
// User.find().then((data) => console.log(data)).catch((err) => console.log(err.message));
// ?findOne
// User.findOne({ userName: "silu" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?findById()
// User.findById("612f3d4b0f3b7f3f2c9f6b1f")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?findByIdAndUpdate()
// User.findByIdAndUpdate("612f3d4b0f3b7f3f2c9f6b1f", {
//   userName: "silu",
//   dob: new Date("2005-9-9"),
//   isActive: true,
//   email: "silu123@gmail.com",
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
// })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?findByIdAndDelete()
// User.findByIdAndDelete("612f3d4b0f3b7f3f2c9f6b1f")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
//!-----------------Update operation---------------
// ?updateOne()
// User.updateOne(
//   { userName: "silu" },
//   {
//     userName: "silu",
//     dob: new Date("2005-9-9"),
//     isActive: true,
//     email: "SILU@GMAIL.COM",
//     interest: ["coding", "reading"],
//     objectId: new mongoose.Types.ObjectId(),
//     address: {
//       street: "bong street",
//       city: "bong city",
//       pincode: 123456,
//     },
//     customData: {
//       key1: "value1",
//       key2: "value2",
//     },
//   }
// )
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?updateMany()
// User.updateMany(
//   { userName: "silu" },
//   {

//!-----------------Delete operation---------------

// ?deleteOne()
// User.deleteOne({ userName: "silu" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?deleteMany()
// User.deleteMany({ userName: "silu" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?remove()
// User.remove({ userName: "silu" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?findOneAndRemove()
// User.findOneandRemove({ userName: "silu" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?findByIdAndRemove()
// User.findByIdAndRemove("612f3d4b0f3b7f3f2c9f6b1f")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?deleteById()
// User.findByIdAndRemove("612f3d4b0f3b7f3f2c9f6b1f")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// !-----------------READ operation WITH WHERE----------------
// ?WHERE
// User.find({ userName: "silu" }).Where("isActive").equals(true)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?WHERE IN
// User.find({ userName: { $in: ["silu", "chotuchai"] } })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?SORT
// User.find().sort({ userName: 1 })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?LIMIT
// User.find().limit(2)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?SKIP
// User.find().skip(2)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?SELECT  
// User.find().select("userName email")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?COUNT
// User.find().count()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?POPULATE
// User.find().populate("objectId")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));
// ?AGGREGATE
// User.aggregate([
//   {
//     $match: { userName: "silu" },
//   },
//   {
//     $group: { _id: "$userName", total: { $sum: 1 } },
//   },
// ])
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));


// start the server
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`);
});
