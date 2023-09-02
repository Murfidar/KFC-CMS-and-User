"use strict";

const express = require("express");
const Controller = require("../controller/cuisine.controller");
const authorized = require("../middlewares/authorized.middleware");
const router = express.Router();

router.get("/", Controller.cuisine);
router.post("/", Controller.createNewCuisine);
router.get("/:id", Controller.cuisineById);
router.use("/:id", authorized);
router.put("/:id", Controller.replaceCuisine);
router.patch("/:id", Controller.updateStatusCuisine);
router.delete("/:id", Controller.deleteCuisine);

module.exports = router;
