const userDao = require("../models/userDao");
const error = require("../middlewares/error");

const userPost = async (data) => {
  const email = data.getUserEmail();
  error.findKeyError({ email });
  await userDao.userPost(email);
};

module.exports = {
  userPost,
};
