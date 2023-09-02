"use strict";

const express = require("express");
const Controller = require("../controller/customer.controller");
const router = express.Router();
const authenticate = require("../middlewares/authenticate.middleware");


// user
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

// cuisine
router.get("/cuisines", Controller.getCuisine);
router.get("/cuisines/:id", Controller.getCuisineById);

router.use(authenticate);

// bookmarks
router.post("/cuisines/:id", Controller.addToBookmark);
router.get("/bookmarks", Controller.getBookmarkCuisine);
router.delete("/bookmarks/:id", Controller.deleteBookmark);

module.exports = router;
