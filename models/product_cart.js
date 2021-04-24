const db = require('../entities');
var productCart = db.product_cart;
var Product = db.products;

exports.selectaCartProducts = function (select, where,order=null) {
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
            ['product_cart_updated_on', 'DESC']
        ];
    }
    productCart.belongsTo(Product, {foreignKey: 'product_id'});
    var includeProduct={ 
        model : Product ,
        attributes:['product_id','product_name','product_description','product_price','product_make'],
        required : true 
    }
    obj['include'] = [includeProduct];
    return productCart.findAll(obj);
};

exports.addProductIntoCart = function (data) {
    let where = {
        product_id:data.product_id,
        user_id:data.user_id
    };
    return productCart.findOrCreate({
        where:where, 
        defaults: {
            product_id:data.product_id,
            user_id:data.user_id,
            product_cart_created_on:Math.floor(Date.now() / 1000),
            product_cart_updated_on: Math.floor(Date.now() / 1000)
        }
    }).then( function(tag){
        // console.log(tag);
        return productCart.increment(['count'],{by:1, where: where});
    })
};




