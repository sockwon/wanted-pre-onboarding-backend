const notificationDao = require("../models/notificationDao");

const notificationPost = async (
  companyId,
  position,
  reward,
  stack,
  region,
  nation,
  description
) => {
  await notificationDao.notificationPost(
    companyId,
    position,
    reward,
    stack,
    region,
    nation,
    description
  );
};

module.exports = {
  notificationPost,
};
