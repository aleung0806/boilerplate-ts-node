import express from 'express'
import authController from '../../controllers/auth.controller'
import authSchema from '../../middlewares/validationSchemas/auth.schema'
import validate from '../../middlewares/validate'
import passport from '../../middlewares/passport'
const router = express.Router()
import { authorize, loggedOutOnly, loggedInOnly }from '../../middlewares/authorize'

router.get('/google-auth', loggedOutOnly, authController.google);
router.get('/google-auth/callback', loggedOutOnly, authController.googleCallback);

router.post('/login', loggedOutOnly, validate(authSchema.login), authController.login)
router.post('/register', loggedOutOnly, validate(authSchema.register), authController.register)
router.post('/logout', loggedInOnly, validate(authSchema.logout), authController.logout)

// test routes
router.get('/verify', authController.verify)


router.post('/reset-password')
router.post('/verify-reset-password')
router.post('/verify-email')


export default router