const express = require("express");
const Controller = require("../controllers/controller");
const routerPackage = require("./package");
const routerAuth = require("./auth");
const router = express.Router();

router.use(routerAuth);
router.get("/", Controller.home);
router.use("/package", routerPackage);

module.exports = router;
