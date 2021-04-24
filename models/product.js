const db = require('../entities');
var Product = db.products;

exports.selectallProducts = function (select, where,order=null) {
    let obj = {};
	if (select.length > 0) {
        obj['attributes'] = select
	}
    if (where) {
        obj['where'] = where
	}
    if (order) {
        obj['order'] = order
    } else {
        obj['order'] = [
            ['product_id', 'ASC']
        ];
    }
    return Product.findAll(obj);
}

exports.selectProducts = function (select, where) {
    return Product.findOne({attributes:select,where:where});
}
