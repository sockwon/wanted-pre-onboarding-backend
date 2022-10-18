const notificationDao = require("../models/notificationDao");
const error = require("../middlewares/error");

const notificationPost = async (data) => {
  const result = data.getNotificationData();
  error.findKeyError(result);
  await notificationDao.notificationPost(result);
};

const notificationPatch = async (data) => {
  const result = data.getNotificationUpdateData();
  const notificationId = data.getNotificationId();
  await notificationDao.notificationPatch(notificationId, result);
};

const notificationDelete = async (data) => {
  const notificationId = data.getNotificationId();
  await notificationDao.notificationDelete(notificationId);
};

const notificationGetList = async () => {
  return await notificationDao.notificationGetList();
};

const notificationGetSearch = async (data) => {
  const result = data.getSearchList();
  error.findKeyError(result);
  return await notificationDao.notificationGetSearch(result);
};

const notificationGetPage = async (data) => {
  const notificationId = data.getNotificationId();
  error.findKeyError(notificationId);
  return await notificationDao.notificationGetPage(notificationId);
};

module.exports = {
  notificationPost,
  notificationPatch,
  notificationDelete,
  notificationGetList,
  notificationGetSearch,
  notificationGetPage,
};
