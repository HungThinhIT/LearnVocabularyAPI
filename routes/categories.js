var express = require('express');
var router = express.Router();
//Require controller
const categoryController = require("../controllers/CategoryController");
//Require Middleware
const auth = require("../middleware/auth")
//Express-validator

router.get("/", auth, categoryController.getCategory)



module.exports = router