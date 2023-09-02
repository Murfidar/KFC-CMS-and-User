"use strict";

const express = require("express");
const AuthController = require("../controller/auth.controller");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post('/google-login', AuthController.googleLogin)

module.exports = router;
