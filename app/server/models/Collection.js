import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Collection",
  tableName: "collections",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    label: {
      type: "varchar",
    },
  },
  relations: {
    inventory: {
        target: "Inventory",
        type: "one-to-many",
        inverseSide: "collection",
        cascade: true,
    },
  },
});
