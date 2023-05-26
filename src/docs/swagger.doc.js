const authPath = require('./paths/auth.doc')
const usersPath = require('./paths/users.doc')
const components = require('./components.doc')
const { http } = require('winston')

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "node-boilerplate",
    description: "api documentation",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3000/v1",
      description: "test server"
    }
  ],
  tags: [
    {
      name: "auth",
      description: "authentication"
    },
    {
      name: "users",
      description: "manage users"
    }
  ],
  components: {
    securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        // oauth2: {
        //   type: 'oauth2',
        //   description: 'This API uses oauth 2.0 with authorization code flow',
        //   flows: {
        //     authorizationCode: {
        //       authorizationUrl: 'http:localhost:3000/v1/oauth2/authorize'
        //     }
        //   }
        // }
      },
    ...components
  },
  paths: {
    ...authPath,
    ...usersPath
  },
  security: {
    bearerAuth: []
  }

}