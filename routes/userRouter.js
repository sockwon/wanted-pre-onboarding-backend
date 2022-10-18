const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

router.post("/create", errorHandlerAsync(userController.userPost));

router.post(
  "/registration",
  errorHandlerAsync(userController.userRegistrationPost)
);

module.exports = {
  router,
};
