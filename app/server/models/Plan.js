import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Plan",
  tableName: "plans",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    label: {
      type: "varchar",
      nullable: true,
    },
    concert_date: {
      type: "text",
      nullable: true,
    },
    creation_date: {
      type: "text",
      nullable: true,
    },
    pdf_image: {
      type: "text",
      nullable: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
      inverseSide: "plans",
    },
  },
});
