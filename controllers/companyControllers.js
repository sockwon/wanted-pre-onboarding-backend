const companyService = require("../services/companyService");

const companyPost = async (req, res) => {
  const { companyName } = req.body;
  await companyService.companyPost(companyName);
  res.status(201).json({ message: "success" });
};

module.exports = {
  companyPost,
};
