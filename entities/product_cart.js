module.exports = function(sequelize, DataTypes) {
    var product_cart = sequelize.define('product_cart', {
        product_cart_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        count: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          defaultValue: '0'
        },
        product_cart_created_on: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
        },
        product_cart_updated_on: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
        },
      }, {
          tableName: 'product_cart',
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          product_cart.belongsTo(models.products, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE',
          });
          product_cart.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
          });
        }
      }
    });
    return product_cart;
  };