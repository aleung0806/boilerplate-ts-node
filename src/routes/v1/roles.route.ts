import express from "express";
import userController from "../../controllers/user.controller";
const router = express.Router();
import { authorize }from '../../middlewares/authorize'
import validate from '../../middlewares/validate'
import userSchema from '../../middlewares/validationSchemas/user.schema'

router.route("/roles/:id")
  .put(validate(userSchema.updateRoleById), authorize(['admin']), userController.updateRoleById)


export default router
