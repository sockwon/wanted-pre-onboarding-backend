const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const companyRouter = require("./companyRouter");
const notificationRouter = require("./notificationRouter");

router.use("/user", userRouter.router);

router.use("/company", companyRouter.router);

router.use("/notification", notificationRouter.router);

module.exports = router;
