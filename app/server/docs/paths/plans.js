import planResponse from "../responses/plans.js";

export default {
  "/plannen": {
    summary: "CRUD with plans",
    description: "Get all plans in the database",
    get: {
      tags: ["Plans"],
      summary: "Get all plans",
      responses: planResponse,
    },
    post: {
      tags: ["Plans"],
      summary: "Create a new plan",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Plan",
            },
          },
        },
      },
      responses: planResponse,
    },
    put: {
      tags: ["Plans"],
    },
  },
  "/plannen/{id}": {
    summary: "Get one plan with given id",
    description: "Get one plan with given id",
    get: {
      tags: ["Plans"],
      summary: "Get one plan with given id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the plan to get",
        },
      ],
      responses: planResponse,
    },
    delete: {
      tags: ["Plans"],
      summary: "Deletes an plan with an id",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the plan to delete",
        },
      ],
    },
  },
};
