var express = require('express');
var router = express.Router();

//Require controller
var userController = require("../controllers/UserController");
userController = new userController();


//DOCUMENTATION BELOW
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /user:
 *  get:
 *    tags: [Users]
 *    description: Use to get information of current user.
 *    responses: 
 *      '200':
 *        description: A susscess responses 
 */

router.get("/", userController.getUser)

module.exports = router;
