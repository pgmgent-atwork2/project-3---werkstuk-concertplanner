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
    size: {
      type: "int",
    },
    color: {
      type: "varchar",
    },
    quantity: {
      type: "int",
    },
  },
});
