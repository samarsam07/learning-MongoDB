const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
// middleware
app.use(express.urlencoded({ extended: true }));
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
  const { username, password } = req.body;
});
// dashboard route
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
// logout route
app.post("/logout", (req, res) => {
  
});
// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
