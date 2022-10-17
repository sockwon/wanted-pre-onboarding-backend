const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyControllers");

router.post("/create", companyController.companyPost);

module.exports = {
  router,
};
