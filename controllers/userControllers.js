const userService = require("../services/userService");
const requestData = require("../middlewares/container");

const userPost = async (req, res) => {
  await userService.userPost(new requestData(req));
  res.status(201).json({ message: "success" });
};

const userRegistrationPost = async (req, res) => {
  await userService.userRegistrationPost(new requestData(req));
  res.status(201).json({ message: "success" });
};

module.exports = {
  userPost,
  userRegistrationPost,
};
