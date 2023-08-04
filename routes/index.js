const express = require("express");
const Controller = require("../controllers/controller");
const routerPackage = require("./package");
const routerAuth = require("./auth");
// const StripeController = require("../controllers/StripeController");
const routerStripe = require("./stripe");
const router = express.Router();

router.get("/", Controller.home);
router.use("/package", routerPackage);
router.use(routerAuth);
router.use(routerStripe);

module.exports = router;
