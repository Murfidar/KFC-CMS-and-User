"use strict";

const { History } = require("../models");

class Controller {
  static async history(req, res, next) {
    try {
      let data = await History.findAll({orderBy: ['id', 'DESC']});
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
