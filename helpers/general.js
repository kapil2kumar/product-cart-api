const jwt = require('jsonwebtoken');
const logger = require('../logger');
const {jwtSetting} = require('../config/setting');
const { JSON } = require('sequelize');

/**
 * Send General Response
 */
const sendResponse = module.exports.sendResponse = (res, data,statusCode=null) => {
	let code = data && data.code ? data.code : statusCode ? statusCode : 200;
    res.status(code).json(data);
	res.end();
};

/**
 * Base64 Encode
 */
 const base64Encode = module.exports.base64Encode = (data) => {
    let buff = new Buffer(data);
	return buff.toString('base64');
};

/**
 * Base64 Decode
 */
 const base64Decode = module.exports.base64Decode = (data) => {
    let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
};

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user ID
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createLoginToken = (user) => {
	var token = jwt.sign({
		user_id: user.user_id,
		user_email: base64Encode(user.user_email),
		exp: new Date().getTime() + jwtSetting.SESSION_DURATION,
		scope: "active",
		message: 'valid token'
	}, jwtSetting.JWT_SIGNING_KEY, {algorithm:jwtSetting.JWT_SIGNING_ALGORITHM});
	return token;
  };
  
  /**
   * Load the user object into the request from the session data.
   *
   *  @param {Object} req  - The http request object.
   *  @param {Object} res  - The http response object.
   *  @param {Object} next - Continue processing the request.
   */
  module.exports.authnticateUser = (req, res, next) => {
	token = req.headers['Authorization'] ? req.headers['Authorization'] : req.headers['authorization'];
	if (token) {
		logger.info('verify JWT token')
	  	jwt.verify(token, jwtSetting.JWT_SIGNING_KEY, jwtSetting.JWT_SIGNING_ALGORITHM, (err, verifiedJwt) => {
			if (err) {
				logger.error(err);
				logger.error(err.name);
				let responseData = {
					status: false,
					msg: 'Invalid Token',
					data: null,
					error: err.message,
					code:401
				};
				sendResponse(res,responseData,401);
			} else {
				req.user = verifiedJwt;
				req.user.user_email = base64Decode(req.user.user_email);
				next();
			}
	  	});
	} else {
	  let responseData = {
		  status: false,
		  msg: 'Invalid Token',
		  data: null,
		  error: "",
		  code:401
	  };
	  sendResponse(res,responseData,401);
	}
  }