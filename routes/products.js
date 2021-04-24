const express = require('express');
const validate = require('express-jsonschema').validate;
const router = express.Router();
const productsController = require('../controllers/productsController');
const productVariable = require('./variables/productVariable');
const {authnticateUser} = require("../helpers/general");

/**
 * This API is use to returns a collection of all products
 * @route GET /products
 * @group Return all products
 * @returns {object} 200 - An object {status, msg, data, error, code}
 * @returns {Error}  500 - {status, msg, data, error, code}
 * @security JWT
 */
router.get("/",authnticateUser,productsController.getAllProducts);

/**
 * JSON parameters require a model. addtocart model
 * @typedef addProductIntoCart
 * @property {integer} product_id.required -email of user - eg: 1
 */
/**
 * This API is use to add product into cart
 * @route POST /products/cart/add
 * @group Add to Cart 
 * @param {addProductIntoCart.model} name.body.required - addtocart
 * @returns {object} 200 - An object {status, msg, data, error, code}
 * @returns {Error}  500,400,401 - {status, msg, data, error, code}
 * @security JWT
 */
router.post("/cart/add",authnticateUser,validate({body: productVariable.productCartSchema}),productsController.addProductIntoCart);

/**
 * This API is use to returns all products into cart for specific user
 * @route GET /products/cart
 * @group Return Cart items
 * @returns {object} 200 - An object {status, msg, data, error, code}
 * @returns {Error}  500 - {status, msg, data, error, code}
 * @security JWT
 */
router.get("/cart",authnticateUser,productsController.getCartProduct);

module.exports = router;
