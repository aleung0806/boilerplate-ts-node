const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const testRouter = require('./test.route');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/test',
    route: testRouter
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

console.log(router)
module.exports = router;