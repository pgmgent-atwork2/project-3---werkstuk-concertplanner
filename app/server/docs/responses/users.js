export default {
  200: {
    description: "Successful response",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/User",
        },
      },
    },
  },
};
