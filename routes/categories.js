var express = require('express');
var router = express.Router();
//Require controller
const categoryController = require("../controllers/CategoryController");
//Require Middleware
const auth = require("../middleware/auth")
//Express-validator
const {validate} = require("../validates/validate.category")

router.get("/",auth, categoryController.getCategories)
router.get("/:categoryId", auth ,validate.getDetailCategory(), categoryController.getCardsInCategory)
router.post("/", auth, validate.create(), categoryController.createCategory)
router.patch("/:categoryId", auth, validate.changeName(), categoryController.changeCategoryName)
module.exports = router