const { database } = require("./database");
const User = require("../entity/User");

const userPost = async (email) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email: email,
    })
    .execute();
};

module.exports = {
  userPost,
};
