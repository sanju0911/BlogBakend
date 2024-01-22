const express = require("express");
const controllers = require("../controllers/User_controller");

const router = express.Router();

router.get("/", controllers.getAllUser);
router.post("/signup", controllers.signup);
router.post("/login", controllers.login);

module.exports = router;
