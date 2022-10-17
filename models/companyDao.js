const { database } = require("./database");
const Company = require("../entity/Company");

const companyPost = async (companyName) => {
  return await database
    .createQueryBuilder()
    .insert()
    .into(Company)
    .values({
      company_name: companyName,
    })
    .execute();
};

module.exports = {
  companyPost,
};
