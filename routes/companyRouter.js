const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyControllers");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

router.post("/create", errorHandlerAsync(companyController.companyPost));

module.exports = {
  router,
};
