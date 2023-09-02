"use strict";

const { Cuisine, User, Category, History } = require("../models");

class Controller {
  static async cuisine(req, res, next) {
    try {
      let data = await Cuisine.findAll({
        include: [
          { model: Category },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async cuisineById(req, res, next) {
    try {
      let data = await Cuisine.findByPk(req.params.id, {
        include: [
          { model: Category },
          {
            model: User,
            attributes: { exclude: "password" },
          },
        ],
      });
      if (!data) throw { name: "NotFound" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createNewCuisine(req, res, next) {
    try {
      let { name, description, price, imgUrl, authorId, categoryId } = req.body;
      let cuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
      });
      let username = req.user.username;
      let id = cuisine.id;
      let log = `POST: new cuisine with id ${id} has been created`;
      let history = await History.create({
        name,
        description: log,
        updatedBy: username,
      });
      res.status(201).json({ cuisine, history });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    try {
      let cuisine = await Cuisine.findByPk(req.params.id);
      if (!cuisine) throw { name: "NotFound" };

      let name = cuisine.name;
      let id = cuisine.id;
      let username = req.user.username;

      await Cuisine.destroy({ where: { id: req.params.id } });
      let log = `DELETE: cuisine ${name} with id ${id} has been deleted`;
      await History.create({
        name,
        description: log,
        updatedBy: username,
      });
      res
        .status(200)
        .json({ message: "Cuisine success to delete", data: cuisine });
    } catch (error) {
      next(error);
    }
  }

  static async replaceCuisine(req, res, next) {
    try {
      let { name, description, price, imgUrl, authorId, categoryId } = req.body;
      let cuisine = await Cuisine.findByPk(req.params.id);
      cuisine = await cuisine.update({
        name,
        description,
        price,
        imgUrl,
        authorId,
        categoryId,
      });

      let username = req.user.username;
      let id = cuisine.id;
      let log = `PUT: cuisine with id ${id} has been updated`;
      let history = await History.create({
        name,
        description: log,
        updatedBy: username,
      });

      res.status(200).json({ cuisine, history });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatusCuisine(req, res, next) {
    try {
      let { status } = req.body;
      let cuisine = await Cuisine.findByPk(req.params.id);
      let previousStatus = cuisine.status;
      if (!cuisine) throw { name: "NotFound" };
      if (req.user.role !== "Admin") throw { name: "Unautorized" };
      cuisine = await cuisine.update({ status });

      let username = req.user.username;
      let { name } = cuisine;
      let id = cuisine.id;
      let log = `PATCH: cuisine STATUS with id ${id} has been updated FROM ${previousStatus} to ${status} `;
      let history = await History.create({
        name,
        description: log,
        updatedBy: username,
      });

      res.status(200).json({ cuisine, history });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
