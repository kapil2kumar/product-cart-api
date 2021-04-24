const db = require('../entities');
var User = db.users;

exports.selectUser = function (select, where) {
	if (select.length == 0) {
		return User.findOne({where: where});
	} else {
		return User.findOne({attributes: select,where: where});
	}
}
