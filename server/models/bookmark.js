"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer, { foreignKey: "customerId" });
      Bookmark.belongsTo(models.Cuisine, { foreignKey: "cuisineId" });
    }
  }
  Bookmark.init(
    {
      customerId: { type: DataTypes.INTEGER, allowNull: false },
      cuisineId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
