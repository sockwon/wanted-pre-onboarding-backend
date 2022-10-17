const userService = require("../services/userService");

const userPost = async (req, res) => {
  const { email } = req.body;
  await userService.userPost(email);
  res.status(201).json({ message: "success" });
};

module.exports = {
  userPost,
};
