const { DataSource } = require("typeorm");
const User = require("../entity/User");
const Company = require("../entity/Company");

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: true,
  synchronize: true,
  entities: [User, Company],
});

module.exports = {
  database,
};
