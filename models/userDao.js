const { database } = require("./database");
const User = require("../entity/User");
const Registration = require("../entity/Registration");
const error = require("../middlewares/error");
const notificationDao = require("./notificationDao");

const userPost = async (email) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email: email,
    })
    .execute();
};

const userRegistrationPost = async (userId, notificationId) => {
  if (await notificationDao.isExistId("notification", notificationId)) {
    try {
      return await database
        .createQueryBuilder()
        .insert()
        .into(Registration)
        .values({ userId, notificationId })
        .execute();
    } catch (err) {
      throw new error.BaseError("invalid_input", 400, "already_applied");
    }
  } else {
    throw new error.BaseError("not_exist", 400, "not_exist");
  }
};

module.exports = {
  userPost,
  userRegistrationPost,
};
