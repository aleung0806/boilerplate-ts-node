import express from "express";


export const customRouter = <_Type>(path, controller) => {
  const router = express.Router();

  router.route(path)
    .post(controller.create)
    .get(controller.getAll)
    .delete(controller.deleteAll)

  router.route(`${path}/:id`)
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.remove)

  return router
}
