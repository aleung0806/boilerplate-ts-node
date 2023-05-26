const schemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      username: { type: "string" },
      role: { type: "string "}
    }
  },
  Error: {
    type: "object",
    properties: {
      code: { type: "number" },
      message: { type: "string" }
    }
  }
}
const responses = {
  BadRequest: { //400
    description: "Bad request",
    content: { 'application/json': {
        schema: { $ref: "#/components/schemas/Error"}
    }}
  },
  Unauthorized: { //401
    description: "Unauthorized",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  },
  Forbidden: { //403
    description: "Forbidden",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  },
  NotFound: { //404
    description: "Not found",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  }
}

module.exports = {
  schemas,
  responses
}