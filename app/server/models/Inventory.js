import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Inventory",
  tableName: "inventory",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    collection: {
      type: "varchar",
    },
    label: {
      type: "varchar",
    },
    width: {
      type: "int",
    },
    height: {
      type: "int",
    },
    color: {
      type: "varchar",
    },
    quantity: {
      type: "int",
    },
  },
  relations: {
    collection: {
      target: "Collection",
      type: "many-to-one",
      joinColumn: {
        name: "collection_id",
      },
      onDelete: "CASCADE",
      inverseSide: "inventory",
    },
  },
});
