"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formatStartDate() {
      return this.startDate.toISOString().split("T")[0];
    }

    get formatEndDate() {
      return this.endDate.toISOString().split("T")[0];
    }
  }
  Package.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      destination: DataTypes.STRING,
      descriptions: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
