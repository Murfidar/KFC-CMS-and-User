"use strict";

const { generateAccessToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { Cuisine, User, Category } = require("../models");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      let user = await User.create(
        { username, email, password, phoneNumber, address },
        "Users"
      );

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { key, password } = req.body;
      let user;
      if (key.includes("@")) {
        user = await User.findOne({
          where: { email: key },
        });
      } else {
        user = await User.findOne({
          where: { username: key },
        });
      }

      if (!user) throw { name: "NotFoundLoginDetais" };

      const isVerified = user.verifyPassword(password);

      if (!isVerified) throw { name: "Invalid Password" };

      const access_token = generateAccessToken(user);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

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

      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create(
          {
            username: payload.name.replace(/\s/g, ""),
            email,
            password: "google_sign_in",
            role: "Staff",
            phoneNumber: "0857 1111 2222",
            address: "Jl. Kokas X No.X",
          },
          { hooks: false }
        );
      }
      const access_token = generateAccessToken(user);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
