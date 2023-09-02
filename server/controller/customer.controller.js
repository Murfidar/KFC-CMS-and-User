"use strict";

const { generateAccessToken, verifyAccessToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const { Customer, Cuisine, Bookmark } = require("../models");
const getPagination = require("../helpers/pagination");

class Controller {
  // register
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      let customer = await Customer.create({ email, password });

      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  // login
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let customer = await Customer.findOne({
        where: { email },
      });

      if (!customer) throw { name: "NotFoundLoginDetais" };

      const isVerified = customer.verifyPassword(password);

      if (!isVerified) throw { name: "Invalid Password" };

      const access_token = generateAccessToken(customer);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  // g-login
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { email } = payload;

      let customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        customer = await Customer.create({
          email,
          password: "google_sign_in",
        });
      }
      const access_token = generateAccessToken(customer);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getCuisine(req, res, next) {
    try {
      let { page, size, name } = req.query;
      // console.log(req.query);

      var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

      let { limit, offset } = getPagination(page, size);

      let data = await Cuisine.findAndCountAll({
        order: ["categoryId"],
        limit,
        offset,
      });

      const { count, rows } = data;
      let cuisines = rows;
      let totalItems = count;

      if (condition) {
        cuisines = await Cuisine.findAll({ where: condition });
        totalItems = cuisines.length;
      }

      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      data = { totalItems, cuisines, totalPages, currentPage };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getCuisineById(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Cuisine.findByPk(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getBookmarkCuisine(req, res, next) {
    try {
      let { page, size } = req.query;
      // console.log(req.query);

      let { limit, offset } = getPagination(page, size);

      let customerId = req.user.id;
      let data = await Bookmark.findAndCountAll({
        limit,
        offset,
        include: { model: Cuisine },
        where: { customerId },
      });

      const { count: totalItems, rows: bookmarks } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      data = { totalItems, bookmarks, totalPages, currentPage };

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addToBookmark(req, res, next) {
    try {
      let cuisineId = req.params.id;
      let customerId = req.user.id;
      let bookmark = await Bookmark.create({
        customerId,
        cuisineId,
      });

      res.status(201).json({ bookmark });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      let id = req.params.id;
      let bookmark = await Bookmark.destroy({ where: { id } });

      res.status(200).json({ message: "Bookmark success to delete", bookmark });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
