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
    // create a new database
    const database = client.db("student-database");
    // new collection(student)
    const students = database.collection("students");
    //! new document using insertOne()
    // const result = await students.insertOne({
    //   name: "chenku",
    //   age: 21,
    //   subjects: ["maths", "science"],
    // });
    // console.log(result);
    //! new document using insertMany()
    // const result = await students.insertMany([
    //   {
    //     name: "bongu",
    //     age: 22,
    //     subjects: ["maths", "chemistry"],
    //   },
    //   {
    //     name: "chotu",
    //     age: 23,
    //     subjects: ["english", "biology"],
    //   },
    //   {
    //     name: "billa",
    //     age: 18,
    //     subjects: ["hindi", "history", "geography"],
    //   },
    // ]);
    // console.log(result);
    // !-------------------READ OPERATION-------------------
    //? find() method
    // const resultCursor=students.find();
    // const resultArray=await resultCursor.toArray();
    // console.log(resultArray);
    // ? findOne() method
    // const result = await students.findOne({ age: 21 });
    // console.log(result);
    // ! update operation
    // ?updateOne()
    // const result=await students.updateOne({name:"billa"},{
    //   $set:{age:20}
    // })
    // console.log(result);
    // ?updateMany()
    // const result=await students.updateMany({age:21},{ $set:{age:20} });
    // console.log(result);
    // ?findOneAndUpdate()
    // const result = await students.findOneAndUpdate(
    //   { name: "chenku" },
    //   {
    //     $set: { age: 22 },
    //   }
    // );
    // console.log(result);
    // !-------------delete operation-------------------
    // ?deleteOne()
    // const result = await students.deleteOne({ name: "chenku" });
    // console.log(result);
    // ?deleteMany()
    // const result = await students.deleteMany({ age: 21 });
    // console.log(result);
    // ?findOneAndDelete()
    // const result = await students.findOneAndDelete({ name: "chenku" });
    // console.log(result);
    // !-------------------AGGREGATION-------------------
    

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
