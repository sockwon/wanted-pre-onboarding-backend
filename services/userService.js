const userDao = require("../models/userDao");
const error = require("../middlewares/error");

const userPost = async (data) => {
  const email = data.getUserEmail();
  error.findKeyError({ email });
  await userDao.userPost(email);
};

const userRegistrationPost = async (data) => {
  const result = data.getUserIdAndNotificationId();
  error.findKeyError(result);
  await userDao.userRegistrationPost(result.userId, result.notificationId);
};

module.exports = {
  userPost,
  userRegistrationPost,
};
