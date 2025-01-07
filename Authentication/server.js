const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// dummy users
const users = [
  { username: "bong", password: "bong123", role: "admin" },
  { username: "chenku", password: "chenku123", role: "user" },
];
// routes
// ?home route
app.get("/", (req, res) => {
  res.render("home");
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
if(username){
  res.render("dashboard",{username});
}else{
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
