const EntitySchema = require("typeorm").EntitySchema;

const Company = new EntitySchema({
  name: "Company",
  tableName: "company",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
      nullable: false,
    },
    company_name: {
      type: "varchar",
      length: 50,
      nullable: false,
      unique: true,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
  },
  relations: {
    Notification: {
      target: "notification",
      type: "one-to-many",
    },
  },
});

module.exports = Company;
