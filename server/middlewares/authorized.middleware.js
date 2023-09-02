"use strict";

const { Cuisine} = require("../models");

module.exports = async (req, res, next) => {
  try {
    let cuisine = await Cuisine.findByPk(req.params.id);
    if (req.user.role === "Staff" && req.user.id !== cuisine.authorId) {
      throw { name: "Unauthorized" };
    }

    next();
  } catch (error) {
    next(error);
  }
};
