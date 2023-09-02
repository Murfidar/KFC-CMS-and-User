"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is Required",
          },
          notNull: {
            msg: " Name is Required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is Required",
          },
          notNull: {
            msg: "Description is Required",
          },
        },
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Updated By is Required",
          },
          notNull: {
            msg: "Updated By is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
