/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_last_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true
    },
    user_password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    user_block: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    user_created_on: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    user_updated_on: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
  }, {
    tableName: 'users',
  });
  return users;
};
