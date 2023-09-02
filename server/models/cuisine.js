"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.hasMany(models.Bookmark, { foreignKey: "cuisineId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is Required",
          },
          notNull: {
            msg: "Name is Required",
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is Required",
          },
          notNull: {
            msg: "Price is Required",
          },
          min: {
            args: 6000,
            msg: `Price cannot be below 6000`,
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Img Url is Required",
          },
          notNull: {
            msg: "Img Url is Required",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Author Id is Required",
          },
          notNull: {
            msg: "Author Id is Required",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Id is Required",
          },
          notNull: {
            msg: "Category Id is Required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is Required",
          },
          notNull: {
            msg: "Status is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );

  Cuisine.beforeValidate((cuisine) => {
    if (!cuisine.status) cuisine.status = "Active";
  });

  return Cuisine;
};
