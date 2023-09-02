"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, { foreignKey: "authorId" });
    }

    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
        },
        unique: {
          args: true,
          msg: "There is already a user with this username",
        },
      },

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

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role is required",
          },
          notNull: {
            msg: "Role is required",
          },
        },
      },

      phoneNumber: {
        type: DataTypes.STRING,
      },

      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeValidate((user) => {
    if (!user.role) user.role = "Admin";
  });

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.afterCreate((user) => {
    delete user.dataValues.password;
    delete user.dataValues.role;
    delete user.dataValues.phoneNumber;
    delete user.dataValues.address;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
  });
  return User;
};
