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

//DOCUMENTATION BELOW
/**
 * @swagger
 *  tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: [22:15_29032020-BUG]
 *      tags: [Users]
 *      description: Register.
 *      parameters:
 *          - in: body
 *            name: name
 *            required: true
 *            schema:
 *              type: string
 *            description: Your fullname.
 *          - in: body
 *            name: email
 *            required: true
 *            schema:
 *              type: string
 *            description: Email of account.
 *          - in: body
 *            name: password
 *            required: true
 *            schema:
 *              type: string
 *            description: Password of account.
 *      responses: 
 *          '':
 *              description: .
 *  
 * /user:
 *  get:
 *      tags: [Users]
 *      description: Use to get information of current user.
 *      security:
 *      - Bearer: []
 *      responses: 
 *          '':
 *              description: .
 *  post:
 *      tags: [Users]
 *      description: Login.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              $ref: '#/components/schemas/User/properties/email'
 *                          password: 
 *                              $ref: '#/components/schemas/User/properties/password'
 *                  required:
 *                      - email
 *                      - password
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              $ref: '#/components/schemas/User/properties/email'
 *                          password: 
 *                              $ref: '#/components/schemas/User/properties/password'
 *                  required:
 *                      - email
 *                      - password
 *      responses: 
 *          '':
 *              description: .
 *  
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                   email:
 *                       type: string
 *                       description: Email of account
 *                       example: example@hungthinhit.com
 *                   password:
 *                       type: string
 *                   isVerifyEmail:
 *                       type: integer
 *                   userType:
 *                       type: string(ref to UserTypeTable)
 *                   createdAt:
 *                       type: timestamps
 *                   updatedAt:
 *                       type: timestamps
 *              xml:
 *                  name: User
 */

module.exports = router;
