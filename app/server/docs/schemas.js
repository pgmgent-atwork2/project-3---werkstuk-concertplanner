export default {
  User: {
    properties: {
      id: { type: "number" },
      email: { type: "string" },
      password: { type: "string" },
      registration_date: { type: "string" },
      user_meta: {
        $ref: "#/components/schemas/UserMeta",
      },
      role: {
        $ref: "#/components/schemas/Role",
      },
      requests: {
        $ref: "#/components/schemas/Request",
      },
      plans: {
        $ref: "#/components/schemas/Plan",
      },
    },
    example: {
      email: "hetmuziekverbond@gmail.com",
      registration_date: "01/01/2023",
      user_meta: {
        name: "Het Muziekverbond",
        phone: "09 234 86 00",
      },
      role: {
        name: "user",
      },
    },
  },
  UserMeta: {
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      phone: { type: "number" },
    },
  },
  Role: {
    properties: {
      id: { type: "number" },
      label: {
        type: "string",
        enum: ["user", "admin"],
      },
    },
  },
  Inventory: {
    properties: {
      id: { type: "number" },
      label: { type: "string" },
      width: { type: "number" },
      height: { type: "number" },
      color: { type: "string" },
      quantity: { type: "number" },
      collection: {
        $ref: "#/components/schemas/Collection",
      },
    },
    example: {
      label: "1ste violen",
      width: "1",
      height: "1",
      color: "#95ff85",
      quantity: "15",
      collection: {
        label: "Stoelen",
      },
    },
  },
  Collection: {
    properties: {
      id: { type: "number" },
      label: { type: "string" },
    },
  },
  Plan: {
    properties: {
      id: { type: "number" },
      label: { type: "string" },
      concert_date: { type: "string" },
      creation_date: { type: "string" },
      pdf_image: { type: "string" },
      user: {
        $ref: "#/components/schemas/User",
      },
    },
    example: {
      label: "De Grote Opening",
      concert_date: "20/10/23",
      creation_date: "12/04/23",
      pdf_image: "de-grote-opening.pdf",
      user: {
        email: "hetmuziekverbond@gmail.com",
      },
    },
  },
  Request: {
    properties: {
      id: { type: "number" },
      subject: { type: "string" },
      description: { type: "string" },
      creation_date: { type: "string" },
      user: {
        $ref: "#/components/schemas/User",
      },
    },
    example: {
      subject: "Meer podiumelementen?",
      description:
        "Beste, zouden jullie nog meerdere podiumelementen kunnen voorzien van 60cm hoog? Alvast bedankt!",
      creation_date: "24/02/23",
      user: {
        email: "hetmuziekverbond@gmail.com",
      },
    },
  },
};
