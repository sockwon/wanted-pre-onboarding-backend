const { database } = require("./database");
const Notification = require("../entity/Notification");
const error = require("../middlewares/error");

const isExistId = async (column, value) => {
  const result = await database.query(
    `
        SELECT EXISTS(
            SELECT
                id
            FROM ${column}
            WHERE id = '${value}'
        ) as id
        `
  );
  return Number(result[0].id);
};

const notificationPost = async (data) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(Notification)
    .values({
      companyId: data.companyId,
      position: data.position,
      reward: data.reward,
      stack: data.stack,
      region: data.region,
      nation: data.nation,
      description: data.description,
    })
    .execute();
};

const notificationPatch = async (notificationId, contentOfUpdate) => {
  const exist = await isExistId("notification", notificationId);
  if (exist) {
    return await database
      .createQueryBuilder()
      .update(Notification)
      .set(contentOfUpdate)
      .where("id=:id", { id: notificationId })
      .execute();
  } else {
    throw new error.BaseError("Not_exist", 400, "this_id_does_not_exist");
  }
};

const notificationDelete = async (notificationId) => {
  const exist = await isExistId("notification", notificationId);
  if (exist) {
    return await database
      .createQueryBuilder()
      .delete()
      .from(Notification)
      .where("id=:id", { id: notificationId })
      .execute();
  } else {
    throw new error.BaseError("Not_exist", 400, "this_id_does_not_exist");
  }
};

module.exports = { notificationPost, notificationPatch, notificationDelete };
