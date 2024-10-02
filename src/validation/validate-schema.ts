export const schema = {
  body: {
    type: "object",
    properties: {
      price: { type: "number" },
    },
    required: ["price"],
  },
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
};
