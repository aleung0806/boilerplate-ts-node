import express from 'express'
import authController from '../../controllers/auth.controller'
import authSchema from '../../middlewares/validationSchemas/auth.schema'
import validate from '../../middlewares/validate'
import passport from 'passport'
const router = express.Router()
import authorize from '../../middlewares/authorize'

router.post('/register', validate(authSchema.register), authController.register)
router.post('/login', validate(authSchema.login), authController.login)
router.post('/logout', validate(authSchema.logout), authController.logout)
//router.post('/forget-password', validate(authSchema.logout), authController.logout)

// router.post('/logout', logout)
router.get('/verify', authController.verify)


module.exports = router