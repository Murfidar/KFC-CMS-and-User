"use strict";

const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const customer = require("./customer");
const cuisine = require("./cuisine");
const category = require("./category");
const history = require("./history");
const authenticate = require("../middlewares/authenticate.middleware");
const errorHandler = require("../middlewares/error.middleware");

router.use("/customers", customer);

router.use("/", auth);
router.use(authenticate);
router.use("/users", user);
router.use("/cuisines", cuisine);
router.use("/categories", category);
router.use("/histories", history);
router.use(errorHandler);

module.exports = router;
