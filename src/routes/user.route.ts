import express from "express";
import userController from "../controllers/user.controller";
const router = express.Router();
import { authorize } from '../middlewares/authorize'
import validate from '../middlewares/validate'
import userSchema from '../middlewares/validationSchemas/user.schema'


router.route('/users')
  .post(validate(userSchema.create), authorize({roles: ['owner', 'admin']}), userController.create)
  .get(validate(userSchema.getAll), authorize({roles: ['owner', 'admin']}), userController.getAll)
  .delete(validate(userSchema.removeAll), authorize({roles: ['owner', 'admin']}), userController.removeAll)

router.route("/users/:id")
  .get(validate(userSchema.get), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.get)
  .patch(validate(userSchema.update), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.update)
  .delete(validate(userSchema.remove), authorize({roles: ['owner', 'admin'], attributes: ['self']}), userController.remove)

// router.route("/users/:id/role")
//   .put(validate(userSchema.updateRoleById), authorize({roles: ['owner', 'admin']}), userController.updateRoleById)




export default router