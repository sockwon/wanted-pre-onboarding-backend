const userDao = require("../models/userDao");

const userPost = async (email) => {
  await userDao.userPost(email);
};

module.exports = {
  userPost,
};
