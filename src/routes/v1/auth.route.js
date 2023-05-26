const express = require('express')
const authController = require('../../controllers/auth.controller')
const authSchema = require('../../middlewares/validationSchemas/auth.schema')
const validate = require('../../middlewares/validate')
const passport = require('passport')
const router = express.Router()
const authorize = require('../../middlewares/authorize')

router.post('/register', validate(authSchema.register), authController.register)
router.post('/login', validate(authSchema.login), authController.login)
router.post('/logout', validate(authSchema.logout), authController.logout)
//router.post('/forget-password', validate(authSchema.logout), authController.logout)

// router.post('/logout', logout)
router.get('/verify', authController.verify)


module.exports = router