import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    user_meta: {
      target: "UserMeta",
      type: "one-to-one",
      inverseSide: "user",
      cascade: true,
    },
    role: {
      target: "Role",
      type: "many-to-one",
      inverseSide: "user",
      joinColumn: {
        name: "role_id",
      },
    },
    requests: {
      target: "Request",
      type: "one-to-many",
      inverseSide: "user",
      cascade: true,
    },
  },
});
