const Product = require("../models/product");
const productCartModel = require("../models/product_cart");
const logger = require('../logger');
const {constant} = require("../config/setting");
const {createLoginToken} = require("../helpers/general");
// let productCart = {};
const crypto = require("crypto");
const producsService  = {
    getAllProducts: async function(req,res) {
        return new Promise((resolve,reject) => {
            let select = ['product_id','product_name','product_description','product_price','product_make','product_created_on']
            let where = {};
            Product.selectallProducts(select,where).then(product=>{
                if (product && product.length != 0) {
                    resolve({
                        status: true,
                        msg: 'Success',
                        data: product,
                        error: null,
                        code:200
                    })
                } else {
                    resolve({
                        status: false,
                        msg: 'No record found',
                        data: null,
                        error: null,
                        code:200
                    })
                }
            }).catch(error=>{
                reject(error);
            })
        });
    },
    addProductIntoCart: async function(req,res) {
        return new Promise((resolve,reject) => {
            let product_id = req.body.product_id;
            let user_id = req.user.user_id;
            let select = ['product_id','product_name','product_description','product_price','product_make']
            let where = {product_id:product_id};
            Product.selectProducts(select,where).then(product=>{
                if (product && product.dataValues) {
                    logger.info("Add cart value");
                    // if(!productCart[user_id]){
                    //     productCart[user_id] = {};
                    // }
                    // if(!productCart[user_id][product_id]){
                    //     productCart[user_id][product_id] = 0;
                    // }
                    // productCart[user_id][product_id] = productCart[user_id][product_id] + 1;
                    // resolve({
                    //     status: true,
                    //     msg: 'Success',
                    //     data: productCart[user_id],
                    //     error: null,
                    //     code:200
                    // })
                    productCartModel.addProductIntoCart({product_id:product_id,user_id:user_id}).then(product=>{
                        resolve({
                            status: true,
                            msg: 'Success',
                            data: null,
                            error: null,
                            code:200
                        })
                    }).catch(error=>{
                        reject(error);
                    })
                } else {
                    resolve({
                        status: false,
                        msg: 'ID not found',
                        data: null,
                        error: null,
                        code:400
                    })
                }
            }).catch(error=>{
                reject(error);
            })
        });
    },
    getCartProduct: async function(req,res) {
        return new Promise((resolve,reject) => {
            let user_id = req.user.user_id;
            
            // if(productCart[user_id]){
            //     resolve({
            //         status: true,
            //         msg: 'Success',
            //         data: productCart[user_id],
            //         error: null,
            //         code:200
            //     })
            // } else {
            //     resolve({
            //         status: false,
            //         msg: 'Cart is empty',
            //         data: null,
            //         error: null,
            //         code:200
            //     })
            // }
            let select = ['count']
            let where = {user_id:user_id};
            productCartModel.selectaCartProducts(select,where).then(product=>{
                if (product && product.length != 0) {
                    resolve({
                        status: true,
                        msg: 'Success',
                        data: product,
                        error: null,
                        code:200
                    })
                } else {
                    resolve({
                        status: false,
                        msg: 'Cart is empty',
                        data: null,
                        error: null,
                        code:200
                    })
                }
            }).catch(error=>{
                reject(error);
            })
        });
    },
}
module.exports = producsService;