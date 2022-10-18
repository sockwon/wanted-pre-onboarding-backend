const companyDao = require("../models/companyDao");
const error = require("../middlewares/error");

const companyPost = async (data) => {
  const companyName = data.getCompanyName();
  error.findKeyError({ companyName });
  await companyDao.companyPost(companyName);
};

module.exports = {
  companyPost,
};
