"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Bookmark, { foreignKey: "customerId" });
    }

    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Please enter the correct email format",
          },
        },
        unique: {
          args: true,
          msg: "There is already a user with this email",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [5, Infinity],
            msg: "Password length must be 5 characters or more",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  Customer.beforeValidate((user) => {
    user.role = "Customer";
  });

  Customer.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  Customer.afterCreate((user) => {
    delete user.dataValues.password;
    delete user.dataValues.role;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
  });

  return Customer;
};
