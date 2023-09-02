"use strict";

const express = require("express");
const Controller = require("../controller/history.controller");
const router = express.Router();

router.get("/", Controller.history);

module.exports = router;
