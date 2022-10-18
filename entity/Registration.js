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
    notificationId: {
      type: "int",
      nullable: true,
    },
    userId: {
      type: "int",
      nullable: true,
    },
    created_at: {
      createDate: true,
    },
  },
  relations: {
    notification: {
      target: "Notification",
      type: "many-to-one",
      onDelete: "CASCADE",
      JoinColumn: {
        name: "notification_id",
      },
    },
    user: {
      target: "User",
      type: "many-to-one",
      onDelete: "CASCADE",
      JoinColumn: {
        name: "user_id",
      },
    },
  },
  uniques: [
    {
      columns: ["notificationId", "userId"],
    },
  ],
});

module.exports = Registration;
