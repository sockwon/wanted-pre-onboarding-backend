const EntitySchema = require("typeorm").EntitySchema;

const Registration = new EntitySchema({
  name: "Registration",
  tableName: "registration",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      nullable: false,
    },
    company_id: {
      type: "int",
      nullable: false,
      unsigned: true,
    },
    user_id: {
      type: "int",
      nullable: false,
      unsigned: true,
    },
  },
});
