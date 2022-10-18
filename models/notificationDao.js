const { database } = require("./database");
const Notification = require("../entity/Notification");

const notificationPost = async (
  companyId,
  position,
  reward,
  stack,
  region,
  nation,
  description
) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(Notification)
    .values({
      companyId,
      position,
      reward,
      stack,
      region,
      nation,
      description,
    })
    .execute();
};
module.exports = { notificationPost };
