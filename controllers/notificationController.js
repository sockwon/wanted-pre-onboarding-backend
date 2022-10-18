const notificationService = require("../services/notificationService");
const requestData = require("../middlewares/container");

const notificationPost = async (req, res) => {
  await notificationService.notificationPost(new requestData(req));
  res.status(201).json({ message: "success" });
};

const notificationPatch = async (req, res) => {
  const { notificationId } = req.params;
  await notificationService.notificationPatch(
    notificationId,
    new requestData(req)
  );
  res.status(201).json({ message: "success" });
};

const notificationDelete = async (req, res) => {
  const { notificationId } = req.params;
  await notificationService.notificationDelete(notificationId);
  res.status(204).json({ message: "success" });
};

const notificationGetList = async (req, res) => {
  const result = await notificationService.notificationGetList();
  res.status(200).json(result);
};

module.exports = {
  notificationPost,
  notificationPatch,
  notificationDelete,
  notificationGetList,
};
