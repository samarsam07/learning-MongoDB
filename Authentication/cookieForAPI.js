const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
// middleware
app.use(express.json());
app.use(cookieParser());

// dummy users
const users = [
  { username: "bong", password: "bong123", role: "admin" },
  { username: "chenku", password: "chenku123", role: "user" },
];
// routes
// ?home route
app.get("/", (req, res) => {
  res.json({
    message: "welcome to Api",
  });
});
//  login post route
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
    res.json({
      message: "login success",
    });
  } else {
    res.json({
      message: "login failed",
    });
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
    res.json({
      message: `welcome ${username} to dashboard ,role : ${userData.role}`,
    });
  } else {
    res.json({
      message: "you are not logged in",
    })
  }
});
// logout route
app.get("/logout", (req, res) => {
  res.clearCookie("userData");
  res.json({
    message:"logged out success"
  })
});
// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
