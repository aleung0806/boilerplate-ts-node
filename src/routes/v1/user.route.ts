import express from "express";
import userController from "../../controllers/user.controller";
const router = express.Router();
import { authorize } from '../../middlewares/authorize'
import validate from '../../middlewares/validate'
import userSchema from '../../middlewares/validationSchemas/user.schema'


router.route('/users')
  .post(validate(userSchema.create), authorize({roles: ['owner', 'admin']}), userController.create)
  .get(validate(userSchema.getAll), authorize({roles: ['owner', 'admin']}), userController.getAll)
  .delete(validate(userSchema.deleteAll), authorize({roles: ['owner', 'admin']}), userController.deleteAll)

router.route("/users/:id")
  .get(validate(userSchema.getById), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.getById)
  .patch(validate(userSchema.updateById), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.updateById)
  .delete(validate(userSchema.deleteById), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.deleteById)

router.route("/users/:id/role")
  .put(validate(userSchema.updateRoleById), authorize({roles: ['owner', 'admin']}), userController.updateRoleById)




export default router