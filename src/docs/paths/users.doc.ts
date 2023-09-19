const createUser = {
  summary: "add a new user",
  operationId: 'createUser',
  tags: [ "users" ],
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
    }
  },
  security: {
    OAuth2: ['admin']
  }
}

const getAllUsers = {
  summary: "get all users",
  operationId: 'getAllUsers',
  tags: [ "users" ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
          type: "array",
          items: { $ref: "#/components/schemas/User"}
        }
      }}
  },
  security: {
    OAuth2: ['admin']
  }
  }

const deleteAllUsers = {
  summary: "delete all users",
  operationId: 'deleteAllUsers',
  tags: [ "users" ],
  responses: {
    204: {
      description: "No content"
    }
  },
  security: {
    OAuth2: ['admin']
  }
}

const getUser = {
  summary: "get user by id",
  operationId: 'getUserById',
  tags: [ "users" ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
        schema: { $ref: "#/components/schemas/User" }
    }}
    }
  },
  security: {
    OAuth2: ['admin', 'user']
  }
}

const updateUser =  {
  summary: "update user by id",
  operationId: 'updateUserById',
  tags: [ "users" ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
        schema: { $ref: "#/components/schemas/User" }
    }}
    }
  }
}
const deleteUser = {
  summary: "delete user by id",
  operationId: 'deleteUserById',
  tags: [ "users"],
  responses: {
    204: {
      description: "No content"
    }
  }
}

export default {
  users: {
    post: createUser,
    get: getAllUsers,
    delete: deleteAllUsers
  },
  '/users/{id}': {
    get: getUser,
    patch: updateUser,
    delete: deleteUser
  }
}
