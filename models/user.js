"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.Profile);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email Required!" },
          notNull: { msg: "Email Required!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password Required!" },
          notNull: { msg: "Password Required!" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Role Required!" },
          notNull: { msg: "Role Required!" },
        },
      },
      activated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, options) {
          user.activated = 0;
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        },
      },
    }
  );
  return User;
};
