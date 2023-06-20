import inventoryResponse from "../responses/inventory.js";

export default {
  "/inventaris": {
    summary: "CRUD with inventory",
    description: "Get all inventory in the database",
    get: {
      tags: ["Inventory"],
      summary: "Get all inventory",
      responses: inventoryResponse,
    },
    post: {
      tags: ["Inventory"],
      summary: "Create a new inventory item",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Inventory",
            },
          },
        },
      },
      responses: inventoryResponse,
    },
    put: {
      tags: ["Inventory"],
    },
  },
  "/inventaris/{id}": {
    summary: "Get one inventory item with given id",
    description: "Get one inventory item with given id",
    get: {
      tags: ["Inventory"],
      summary: "Get one inventory item with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the inventory item to get",
        },
      ],
      responses: inventoryResponse,
    },
    delete: {
      tags: ["Inventory"],
      summary: "Deletes an inventory item with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the inventory item to delete",
        },
      ],
    },
  },
};
