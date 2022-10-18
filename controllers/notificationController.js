const notificationService = require("../services/notificationService");
const requestData = require("../middlewares/container");

const notificationPost = async (req, res) => {
  await notificationService.notificationPost(new requestData(req));
  res.status(201).json({ message: "success" });
};

const notificationPatch = async (req, res) => {
  await notificationService.notificationPatch(new requestData(req));
  res.status(201).json({ message: "success" });
};

const notificationDelete = async (req, res) => {
  await notificationService.notificationDelete(new requestData(req));
  res.status(204).json({ message: "success" });
};

const notificationGetList = async (req, res) => {
  const result = await notificationService.notificationGetList();
  res.status(200).json(result);
};

const notificationGetSearch = async (req, res) => {
  const result = await notificationService.notificationGetSearch(
    new requestData(req)
  );
  res.status(200).json(result);
};

const notificationGetPage = async (req, res) => {
  const result = await notificationService.notificationGetPage(
    new requestData(req)
  );
  res.status(200).json(result);
};

module.exports = {
  notificationPost,
  notificationPatch,
  notificationDelete,
  notificationGetList,
  notificationGetSearch,
  notificationGetPage,
};
