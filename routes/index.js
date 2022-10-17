const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const companyRouter = require("./companyRouter");

router.use("/user", userRouter.router);

router.use("/company", companyRouter.router);

module.exports = router;
