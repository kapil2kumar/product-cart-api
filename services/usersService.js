const User = require("../models/user");
const logger = require('../logger');
const {constant} = require("../config/setting");
const {createLoginToken} = require("../helpers/general");

const crypto = require("crypto");
const usersService  = {
    login: async function(req,res) {
        return new Promise((resolve,reject) => {
            let select = ['user_id','user_first_name','user_last_name','user_email','user_password','user_status','user_block']
            let where = {"user_email":req.body.email};
	        let password = crypto.createHash('md5').update(req.body.password).digest("hex");
            User.selectUser(select,where).then(user=>{
                if (user && user.dataValues) {
                    if (user.dataValues.user_password === password) {
                        if (user.dataValues.user_block === constant.user_unblock) {
                            if (user.dataValues.user_status === constant.user_status_active) {
                                delete user.dataValues.user_password;
                                delete user.dataValues.user_block;
                                delete user.dataValues.user_status;
                                logger.info("Generate token");
                                let token = createLoginToken(user.dataValues);
                                user.dataValues.token = token;
                                resolve({
                                    status: true,
                                    msg: 'Success',
                                    data: user.dataValues,
                                    error: null,
                                    code:200
                                })
                            } else {
                                resolve({
                                    status: false,
                                    msg: 'Seems like the account is inactive',
                                    data: null,
                                    error: null,
                                    code:200
                                })
                            }
                        } else {
                            resolve({
                                status: false,
                                msg: 'Seems like the account is blocked',
                                data: null,
                                error: null,
                                code:200
                            })
                        }
                    } else {
                        resolve({
                            status: false,
                            msg: 'Invalid credentials',
                            data: null,
                            error: null,
                            code:200
                        })
                    }
                } else {
                    resolve({
                        status: false,
                        msg: 'Invalid credentials',
                        data: null,
                        error: null,
                        code:200
                    })
                }
            }).catch(error=>{
                reject(error);
            })
        });
    }
}
module.exports = usersService;