const { database } = require("./database");
const Notification = require("../entity/Notification");
const Company = require("../entity/Company");
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

const notificationGetList = async () => {
  return await database
    .getRepository(Notification)
    .createQueryBuilder("notification")
    .select([
      "notification.id as 채용공고_ID",
      "notification.position as 채용포지션",
      "notification.reward as 채용보상금",
      "notification.stack as 사용기술",
      "notification.region as 지역",
      "notification.nation as 국가",
      "notification.description as 채용내용",
    ])
    .execute();
};

const notificationGetSearch = async (search) => {
  return await database
    .getRepository(Notification)
    .createQueryBuilder("notification")
    .select([
      "notification.id as 채용공고_ID",
      "company.company_name as 회사명",
      "notification.position as 채용포지션",
      "notification.reward as 채용보상금",
      "notification.stack as 사용기술",
      "notification.region as 지역",
      "notification.nation as 국가",
      "notification.description as 채용내용",
    ])
    .innerJoin(Company, "company", "company.id = notification.companyId")
    .where("position LIKE :search", { search: `%${search}%` })
    .orWhere("reward LIKE :search", { search: `%${search}%` })
    .orWhere("stack LIKE :search", { search: `%${search}%` })
    .orWhere("region LIKE :search", { search: `%${search}%` })
    .orWhere("nation LIKE :search", { search: `%${search}%` })
    .orWhere("description LIKE :search", { search: `%${search}%` })
    .orWhere("company_name LIKE :search", { search: `%${search}%` })
    .orWhere("notification.id LIKE :search", { search: `%${search}%` })
    .execute();
};

const notificationGetPage = async (notificationId) => {
  const exist = await isExistId("notification", notificationId);
  if (exist) {
    const value = await database
      .getRepository(Notification)
      .createQueryBuilder("notification")
      .select(["company.id"])
      .innerJoin(Company, "company", "company.id = notification.companyId")
      .where("notification.id=:id", { id: notificationId })
      .execute();
    const temp = await database
      .getRepository(Notification)
      .createQueryBuilder("notification")
      .select(["notification.id"])
      .where("notification.companyId=:id", { id: value[0].company_id })
      .execute();
    const arr = [];
    for (let val of temp) {
      arr.push(val.notification_id);
    }
    const result = await database
      .getRepository(Notification)
      .createQueryBuilder("notification")
      .select([
        "notification.id as 채용공고_ID",
        "company.company_name as 회사명",
        "notification.position as 채용포지션",
        "notification.reward as 채용보상금",
        "notification.stack as 사용기술",
        "notification.region as 지역",
        "notification.nation as 국가",
        "notification.description as 채용내용",
      ])
      .innerJoin(Company, "company", "company.id = notification.companyId")
      .where("notification.id=:id", { id: notificationId })
      .execute();
    result[0]["회사가올린다른채용공고_id"] = arr;
    return result;
  } else {
    throw new error.BaseError("Not_exist", 400, "this_id_does_not_exist");
  }
};

module.exports = {
  notificationPost,
  notificationPatch,
  notificationDelete,
  notificationGetList,
  notificationGetSearch,
  notificationGetPage,
};
