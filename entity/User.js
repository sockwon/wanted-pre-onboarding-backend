const EntitySchema = require("typeorm").EntitySchema;

const User = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    created_at: {
      createDate: true,
    },
    updated_at: {
      updateDate: true,
    },
  },
});

module.exports = User;
