const companyService = require("../services/companyService");
const requestData = require("../middlewares/container");
const companyPost = async (req, res) => {
  await companyService.companyPost(new requestData(req));
  res.status(201).json({ message: "success" });
};

module.exports = {
  companyPost,
};
