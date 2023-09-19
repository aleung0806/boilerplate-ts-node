import express from "express";

const router = express.Router();

export const customRouter = <_Type>(path, controller) => {

  router.route(path)
    .post(controller.create)
    .get(controller.getAll)
    .delete(controller.removeAll)

  router.route(`${path}/:id`)
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.remove)

  return router
}
