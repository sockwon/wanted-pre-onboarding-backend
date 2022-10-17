const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/create", userController.userPost);

module.exports = {
  router,
};
