import requestResponse from "../responses/requests.js";

export default {
  "/aanvragen": {
    summary: "CRUD with requests",
    description: "Get all requests in the database",
    get: {
      tags: ["Requests"],
      summary: "Get all requests",
      responses: requestResponse,
    },
    post: {
      tags: ["Requests"],
      summary: "Create a request",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Request",
            },
          },
        },
      },
      responses: requestResponse,
    },
    put: {
      tags: ["Requests"],
    },
  },
  "/aanvragen/{id}": {
    summary: "Get one request with given id",
    description: "Get one request with given id",
    get: {
      tags: ["Requests"],
      summary: "Get one request with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the request to get",
        },
      ],
      responses: requestResponse,
    },
    delete: {
      tags: ["Requests"],
      summary: "Deletes a request with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the request to delete",
        },
      ],
    },
  },
};
