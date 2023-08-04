const express = require("express");
const Controller = require("../controllers/controller");
const StripeController = require("../controllers/StripeController");
const routerPackage = express.Router();

routerPackage.get("/detail/:id", Controller.detail);

routerPackage.use(function (req, res, next) {
  //   console.log(req.session);
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login?error= Login first!");
  }
});
// booking
routerPackage.get("/booking/:id", Controller.booking);
routerPackage.post("/booking/:id", Controller.postBooking);

//checkout
routerPackage.get("/booking/checkout/:id", StripeController.showCheckout);

module.exports = routerPackage;
