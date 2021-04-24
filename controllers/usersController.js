const usersService = require('../services/usersService');
const logger = require('../logger');
const {sendResponse} = require('../helpers/general');

const usersController  = {
    login: async function(req,res) {
        await usersService.login(req,res).then((data) => {
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
module.exports = usersController;