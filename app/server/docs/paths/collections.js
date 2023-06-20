import collectionResponse from "../responses/collections.js";

export default {
  "/collecties": {
    summary: "CRUD with collections",
    description: "Get all collections in the database",
    get: {
      tags: ["Collections"],
      summary: "Get all collections",
      responses: collectionResponse,
    },
    post: {
      tags: ["Collections"],
      summary: "Create a new collection",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Collection",
            },
          },
        },
      },
      responses: collectionResponse,
    },
    put: {
      tags: ["Collections"],
    },
  },
  "/collecties/{id}": {
    summary: "Get one collection with given id",
    description: "Get one collection with given id",
    get: {
      tags: ["Collections"],
      summary: "Get one collection with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the collection to get",
        },
      ],
      responses: collectionResponse,
    },
    delete: {
      tags: ["Collections"],
      summary: "Deletes a collection with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the collection to delete",
        },
      ],
    },
  },
};
