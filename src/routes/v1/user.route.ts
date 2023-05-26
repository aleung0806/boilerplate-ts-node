import express from "express";
import userController from "../../controllers/user.controller";
const router = express.Router();
import authorize from '../../middlewares/authorize'
import validate from '../../middlewares/validate'
import userSchema from '../../middlewares/validationSchemas/user.schema'

router.route('/users')
  .post(validate(userSchema.create), authorize(['admin']), userController.create)
  .get(validate(userSchema.getAll), authorize(['admin']), userController.getAll)
  .delete(validate(userSchema.deleteAll), authorize(['admin']), userController.deleteAll)

router.route("/users/:id")
  .get(validate(userSchema.getById), authorize(['admin', 'self']), userController.getById)
  .patch(validate(userSchema.updateById), authorize(['admin','self']), userController.updateById)
  .delete(validate(userSchema.deleteById), authorize(['admin', 'self']), userController.deleteById)

router.route("/users/:id/role")
  .put(validate(userSchema.updateRoleById), authorize(['admin']), userController.updateRoleById)




module.exports = router;
