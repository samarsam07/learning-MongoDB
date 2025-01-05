const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080 || process.env.PORT;
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
// create a schema
// !embedded data
const studentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    grade: String,
  },
  {
    timestamps: true,
  }
);
const classRoomSchema = new mongoose.Schema(
  {
    class: String,
    students: [studentSchema], //*one to many relationship
  },
  { timestamps: true }
);
const ClassRoom = new mongoose.model("Classroom", classRoomSchema);
// create a new class
const createClass = async () => {
  try {
    const newClass=await ClassRoom.create({
      class: "X",
      students: [
        {
          name: "sam",
          age: 18,
          grade: "A",
        },
        {
          name: "mugi",
          age: 17,
          grade: "B",
        },{
          name: "sara",
          age: 16,
          grade: "C",
        },
      ],
    });
    console.log(newClass);
  } catch (err) {
    console.error("error creating document", err.message);
  }
};
createClass();
// start the server
app.listen(port, () => {
  console.log(`server is runnung on port ${port}`);
});
