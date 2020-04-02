var express = require('express');
var router = express.Router();
//Require controller
const userController = require("../controllers/UserController");
//Require Middleware
const auth = require("../middleware/auth")
//Express-validator
const userValidate = require("../validates/validate.user") 

router.post("/register", userController.create)
router.post("/", userValidate.login, userController.login)
router.get("/", auth ,userController.getUser)
router.patch("/", auth, userController.update)
router.post("/password", auth, userController.changePassword)
router.post("/logout", auth, userController.logout)

module.exports = router;
