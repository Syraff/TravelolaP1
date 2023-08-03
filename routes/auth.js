const express = require("express");
const UserController = require("../controllers/UserController");
const routerAuth = express.Router();

// register
routerAuth.get("/register", UserController.registerForm);
routerAuth.post("/register", UserController.postRegister);

//login
routerAuth.get("/login", UserController.loginForm);
routerAuth.post("/login", UserController.postLogin);

//verification
routerAuth.get("/verification/:email", UserController.verification);

routerAuth.use(function (req, res, next) {
  //   console.log(req.session);
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login?error= Login first!");
  }
});

//logout
routerAuth.get("/logout", UserController.logout);

//profile
routerAuth.get("/profile", UserController.profileForm);

// add profile
routerAuth.post("/profile/add", UserController.addProfile);

// edit profile
routerAuth.post("/profile/edit", UserController.editProfile);

module.exports = routerAuth;
