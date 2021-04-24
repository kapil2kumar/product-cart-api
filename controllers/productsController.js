const producsService = require('../services/producsService');
const logger = require('../logger');
const {sendResponse} = require('../helpers/general');

const productsController  = {
    getAllProducts: async function(req,res) {
        await producsService.getAllProducts(req,res).then((data) => {
            sendResponse(res,data);
        }).catch((error)=>{
            logger.error(error);
            let responseData = {
                status: false,
                msg: 'Internal Server Error',
                data: null,
                error: error.message,
                code:500
            };
            sendResponse(res,responseData);
        })
    },
    addProductIntoCart: async function(req,res) {
        await producsService.addProductIntoCart(req,res).then((data) => {
            sendResponse(res,data);
        }).catch((error)=>{
            logger.error(error);
            let responseData = {
                status: false,
                msg: 'Internal Server Error',
                data: null,
                error: error.message,
                code:500
            };
            sendResponse(res,responseData);
        })
    },
    getCartProduct: async function(req,res) {
        await producsService.getCartProduct(req,res).then((data) => {
            sendResponse(res,data);
        }).catch((error)=>{
            logger.error(error);
            let responseData = {
                status: false,
                msg: 'Internal Server Error',
                data: null,
                error: error.message,
                code:500
            };
            sendResponse(res,responseData);
        })
    }
}
module.exports = productsController;