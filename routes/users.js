const express = require('express');
const validate = require('express-jsonschema').validate;
const router = express.Router();
const usersController = require('../controllers/usersController');
const userVariable = require('./variables/userVariable');

/**
 * JSON parameters require a model. login model
 * @typedef LoginJSON
 * @property {string} email.required -email of user - eg: kapilboon2012@gmail.com
 * @property {string} password.required - password of user - eg: Test@1234
 */
/**
 * This API is use to login into the system
 * @route POST /users/login
 * @group Login - Operations about user login
 * @param {LoginJSON.model} name.body.required - login
 * @returns {object} 200 - An object {status, msg, data, error, code}
 * @returns {Error}  500,400,401 - {status, msg, data, error, code}
 */
router.post("/login",validate({body: userVariable.loginWebSchema}),usersController.login);

module.exports = router;
