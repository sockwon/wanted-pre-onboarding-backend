const notificationDao = require("../models/notificationDao");
const error = require("../middlewares/error");

const notificationPost = async (data) => {
  const result = data.getNotificationData();
  error.findKeyError(result);
  await notificationDao.notificationPost(result);
};

const notificationPatch = async (notificationId, data) => {
  const result = data.getNotificationUpdateData();
  await notificationDao.notificationPatch(notificationId, result);
};

const notificationDelete = async (notificationId) => {
  await notificationDao.notificationDelete(notificationId);
};

module.exports = {
  notificationPost,
  notificationPatch,
  notificationDelete,
};
