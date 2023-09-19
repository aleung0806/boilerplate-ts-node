import express from "express";
import customController from '../../controllers/custom.controller'
const router = express.Router();
import { authorize } from '../../middlewares/authorize'
import validate from '../../middlewares/validate'
import userSchema from '../../middlewares/validationSchemas/user.schema'

const customRoute = (resourceKey) => {
  const path = `/${resourceKey}`
  router.route(path)
  .post(controller.create)
  .get(controller.getAll)
  .delete(controller.deleteAll)

router.route(`${}path/:id`)
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.remove)

}
export default customRoute
