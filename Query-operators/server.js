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
    const database = client.db("employees-database");
    // collectios
    const employees = database.collection("employees");
    // const employessDocs = [
    //   {
    //     name: "John Doe",
    //     age: 25,
    //     dept: "HR",
    //   },
    //   {
    //     name: "Jane Doe",
    //     age: 30,
    //     dept: "Finance",
    //   },
    //   {
    //     name: "James Doe",
    //     age: 35,
    //     dept: "IT",
    //   },
    //   {
    //     name: "Jenny Doe",
    //     age: 40,
    //     dept: "IT",
    //   },{
    //     name:"  David",
    //     age: 45,
    //     dept: "Operations"
    //   }
    // ];
    // const result = await employees.insertMany(employessDocs);
    // !-------------------QUERY OPERATORS-------------------
    // *  $gt
    // const employeesCursor=employees.find({age:{$gt:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);}
    // * $lt
    // const employeesCursor=employees.find({age:{$lt:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $gte
    // const employeesCursor=employees.find({age:{$gte:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $lte
    // const employeesCursor=employees.find({age:{$lte:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $eq
    // const employeesCursor=employees.find({age:{$eq:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $ne
    // const employeesCursor=employees.find({age:{$ne:30}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $in
    // const employeesCursor=employees.find({dept:{$in:["HR","IT"]}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $nin
    // const employeesCursor=employees.find({dept:{$nin:["HR","IT"]}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * MULTIPLE QUERY OPERATORS
    // const employeesCursor=employees.find({age:{$gt:30,$lt:40}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $or
    // const employeesCursor=employees.find({$or:[{age:30},{dept:"IT"}]});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $and
    // const employeesCursor=employees.find({$and:[{age:30},{dept:"IT"}]});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $not
    // const employeesCursor=employees.find({age:{$not:{$eq:30}}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $nor
    // const employeesCursor=employees.find({$nor:[{age:30},{dept:"IT"}]});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $exists
    // const employeesCursor=employees.find({dept:{$exists:true}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $type
    // const employeesCursor=employees.find({age:{$type:"number"}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $mod
    // const employeesCursor=employees.find({age:{$mod:[2,0]}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    // * $regex
    // const employeesCursor=employees.find({name:{$regex:"^J"}});
    // const employeesArray=await employeesCursor.toArray();
    // console.log(employeesArray);
    
  } catch (error) {
    console.log(error);
  }
};
// call the function
connectDB();
// route

// start server
app.listen(port, (req, res) => {
  console.log(`server is running on port ${port}`);
});
