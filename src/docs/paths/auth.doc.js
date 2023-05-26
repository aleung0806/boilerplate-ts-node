const register = {
  summary: "register new user",
  operationId: 'register',
  tags: [ "auth" ],
  requestBody: {
    required: true,
    content: { 'application/json': {
      schema: {
        type: "object",
        required: [ "email", "password", "username" ],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          username: { type: "string" }
        }
      }
    }}
  },
  responses: {
    201: {
      description: "Created",
      content: { 'application/json': {
          schema: { $ref: "#/components/schemas/User" }
      }}
    },
    400: {
      description: 'Email is already in use.'
    },
    400: {
      description: 'Validation exception.'
    }
  }
}

const login = {
  summary: "Logs in user. starts session.",
  operationId: 'login',
  tags: [ "auth" ],
  requestBody: {
    required: true,
    content: { 'application/json': {
        schema: {
          type: "object",
          required: [ "email", "password" ],
          properties: {
            email: { type: "string" },
            password: { type: "string" }
          }
        }
    }}
  },
  responses: {
    200: {
      description: "Logged In",
      content: { 'application/json': {
          schema: { $ref: "#/components/schemas/User" }
        }
    }},
    401: {
      description: "Incorrect email or password",
    }
  }
}

const logout = {
  summary: "Logs user out of current session.",
  operationId: 'logout',
  tags: [ "auth" ],
  responses: {
    200: {
      description: "Logged Out",
    }},
    401: {
      description: "Incorrect email or password",
    }
}

module.exports = {
  '/auth/register': {
    post: register
  },
  '/auth/login': {
    post: login
  },
}