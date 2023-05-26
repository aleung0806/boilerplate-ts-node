import express from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

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
  // {
  //   path: '/test',
  //   route: testRouter
  // }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

console.log(router)
export default router