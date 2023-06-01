import express from 'express'
import authController from '../../controllers/auth.controller'
import authSchema from '../../middlewares/validationSchemas/auth.schema'
import validate from '../../middlewares/validate'
import passport from '../../middlewares/passport'
const router = express.Router()
import authorize from '../../middlewares/authorize'

router.get('/google-auth', authController.google);
router.get('/google-auth/callback', authController.googleCallback);
router.post('/login', authController.login)


router.post('/register', validate(authSchema.register), authController.register)
router.post('/logout', validate(authSchema.logout), authController.logout)
//router.post('/forget-password', validate(authSchema.logout), authController.logout)


// router.post('/logout', logout)
router.get('/verify', authController.verify)

export default router