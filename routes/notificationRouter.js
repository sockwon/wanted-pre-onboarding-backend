const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { errorHandlerAsync } = require("../middlewares/errorHandler");

router.post(
  "/create",
  errorHandlerAsync(notificationController.notificationPost)
);

router.patch(
  "/:notificationId",
  errorHandlerAsync(notificationController.notificationPatch)
);

router.delete(
  "/:notificationId",
  errorHandlerAsync(notificationController.notificationDelete)
);

router.get(
  "/list",
  errorHandlerAsync(notificationController.notificationGetList)
);

router.get(
  "/search",
  errorHandlerAsync(notificationController.notificationGetSearch)
);

module.exports = {
  router,
};
