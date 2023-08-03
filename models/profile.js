"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }

    get formatDateOfBirth() {
      return this.dateOfBirth.toISOString().split("T")[0];
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "First Name Required!" } },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Last Name Required!" } },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: { notEmpty: { msg: "Date Of Birth Required!" } },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Phone Number Required!" } },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
