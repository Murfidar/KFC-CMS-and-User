"use strict";

const express = require("express");
const Controller = require("../controller/category.controller");
const router = express.Router();

router.get("/", Controller.category);
router.post("/", Controller.createNewCategory);
router.put("/:id", Controller.replaceCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;
