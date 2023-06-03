import express from 'express'
import authController from '../../controllers/auth.controller'
import authSchema from '../../middlewares/validationSchemas/auth.schema'
import validate from '../../middlewares/validate'
import passport from '../../middlewares/passport'
const router = express.Router()
import { authorize, loggedOutOnly, loggedInOnly }from '../../middlewares/authorize'

router.get('/google-auth', loggedOutOnly, authController.google);
router.get('/google-auth/callback', loggedOutOnly, authController.googleCallback);
router.post('/login', loggedOutOnly, authController.login)
router.post('/register', loggedOutOnly, validate(authSchema.register), authController.register)


router.post('/logout', loggedInOnly, validate(authSchema.logout), authController.logout)
router.get('/homePage', authController.homePage)
router.get('/loginPage', authController.loginPage)


// router.post('/logout', logout)
router.get('/homePage', authController.homePage)
router.get('/loginPage', authController.loginPage)
router.get('/verify', authController.verify)

export default router