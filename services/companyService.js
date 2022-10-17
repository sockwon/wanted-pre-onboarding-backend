const companyDao = require("../models/companyDao");

const companyPost = async (companyName) => {
  await companyDao.companyPost(companyName);
};
module.exports = {
  companyPost,
};
