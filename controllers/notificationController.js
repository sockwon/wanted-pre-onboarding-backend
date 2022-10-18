const notificationService = require("../services/notificationService");

const notificationPost = async (req, res) => {
  const { companyId, position, reward, stack, region, nation, description } =
    req.body;
  await notificationService.notificationPost(
    companyId,
    position,
    reward,
    stack,
    region,
    nation,
    description
  );
  res.status(201).json({ message: "success" });
};
module.exports = {
  notificationPost,
};
