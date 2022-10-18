const EntitySchema = require("typeorm").EntitySchema;

const Notification = new EntitySchema({
  name: "Notification",
  tableName: "notification",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      nullable: false,
    },
    companyId: {
      type: "int",
      nullable: true,
    },
    position: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    reward: {
      type: "int",
      unsigned: true,
      nullable: false,
    },
    stack: {
      type: "varchar",
      length: "400",
      nullable: true,
    },
    region: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    nation: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
  },
  relations: {
    company: {
      target: "Company",
      type: "many-to-one",
      onDelete: "CASCADE",
      JoinColumn: {
        name: "companyId",
      },
    },
    registration: {
      target: "Registration",
      type: "one-to-many",
    },
  },
});
module.exports = Notification;
