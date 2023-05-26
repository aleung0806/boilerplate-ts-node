const express = require("express");
const userController = require("../../controllers/user.controller");
const router = express.Router();
const authorize = require('../../middlewares/authorize')
const validate = require('../../middlewares/validate')
const userSchema = require('../../middlewares/validationSchemas/user.schema')

router.route("/roles/:id")
  .put(validate(userSchema.updateRoleById), authorize(['admin']), userController.updateRoleById)


module.exports = router;
