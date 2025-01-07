const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// connect to mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://samarmohd251:fziRniuPfa4op4uX@learning.18puu.mongodb.net/student-database"
    );
    console.log("connect to database");
  } catch (err) {
    console.error(err.message);
  }
};
connectDB();
// create the userSchema
const userSchema = {
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
};
// user Model
const User = mongoose.model("UserDash", userSchema);

// routes
// ?home route
app.get("/", (req, res) => {
  res.render("home");
});
// register route
app.get("/register", (req, res) => {
  res.render("register");
});
// post register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/login")
});
// login route
app.get("/login", (req, res) => {
  res.render("login");
});
// login post route
app.post("/login", (req, res) => {
  // found user
  const { username, password } = req.body;
  const userFound = users.find((user) => {
    return user.username === username && user.password === password;
  });
  // create cutom cookie
  res.cookie("userData", JSON.stringify(userFound), {
    maxAge: 3 * 24 * 60 * 60 * 100, //3 days
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  // redirect to dashboard
  if (userFound) {
    res.redirect("/dashboard");
  }
  // redirect to login
});
// dashboard route
app.get("/dashboard", (req, res) => {
  // cookie
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  const username = userData ? userData.username : null;
  if (username) {
    res.render("dashboard", { username });
  } else {
    res.redirect("/login");
  }
});
// logout route
app.get("/logout", (req, res) => {
  res.clearCookie("userData");
  res.redirect("/login");
});
// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
