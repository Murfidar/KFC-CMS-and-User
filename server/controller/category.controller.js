"use strict";

const { Category, History } = require("../models");

class Controller {
  static async category(req, res, next) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createNewCategory(req, res, next) {
    try {
      let { name } = req.body;
      let category = await Category.create({
        name,
      });
      let username = req.user.username;
      let id = category.id;
      let log = `POST: new category with id ${id} has been created`;
      let history = await History.create({
        name,
        description: log,
        updatedBy: username,
      });
      res.status(201).json({ category, history });
    } catch (error) {
      next(error);
    }
  }

  static async replaceCategory(req, res, next) {
    try {
      let { name} = req.body;
      let category = await Category.findByPk(req.params.id);
      category = await category.update({
        name,
      });

      let username = req.user.username;
      let id = category.id;
      let log = `PUT: category with id ${id} has been updated`;
      let history = await History.create({
        name,
        description: log,
        updatedBy: username,
      });

      res.status(200).json({ category, history });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let category = await Category.findByPk(req.params.id);
      if (!category) throw { name: "NotFound" };
      let name = category.name;
      let id = category.id;
      let username = req.user.username;

      await Category.destroy({ where: { id: req.params.id } });
      let log = `DELETE: category ${name} with id ${id} has been deleted`;
      await History.create({
        name,
        description: log,
        updatedBy: username,
      });
      res
        .status(200)
        .json({ message: "Category success to delete", data: category });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
