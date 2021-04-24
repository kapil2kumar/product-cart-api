module.exports = function(sequelize, DataTypes) {
  var products = sequelize.define('products', {
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      product_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      product_make: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        comments:"year when it was built"
      },
      product_status: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      product_created_on: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      product_updated_on: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    }, {
        tableName: 'products',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return products;
};