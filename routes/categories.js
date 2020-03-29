var express = require('express');
var router = express.Router();
//Require controller
const categoryController = require("../controllers/CategoryController");
//Require Middleware
const auth = require("../middleware/auth")
//Express-validator

router.get("/", auth, categoryController.getCategories)

 //DOCUMENTATION BELOW
/**
 * @swagger
 *  tags:
 *      name: Categories
 *      description: Categories management.
 */

/**
 * @swagger
 *  /categories:
 *  get:
 *      tags: [Categories]
 *      description: Get the current categories or public categories.
 *      security:
 *          - Bearer: []
 *      parameters: 
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *            description: Get page of list categories.
 *          - in: query
 *            name: pageSize
 *            schema:
 *              type: integer
 *            description: Amount item of perpage.
 *          - in: query
 *            name: isPublic
 *            schema:
 *              type: integer
 *            description: Get the current local/public categories of user (1 is public and 0 is local).
 *          - in: query
 *            name: type
 *            schema:
 *              type: string
 *            description: Get the local or public categories ("global" or "local").
 *      responses: 
 *          '':
 *              description: .
 */
module.exports = router