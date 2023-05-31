import express from 'express'
import authController from '../../controllers/auth.controller'
import authSchema from '../../middlewares/validationSchemas/auth.schema'
import validate from '../../middlewares/validate'
import passport from '../../middlewares/passport'
const router = express.Router()
import authorize from '../../middlewares/authorize'

router.get('/google', passport.authenticate('google'));



router.post('/login', authController.login)
router.post('/register', validate(authSchema.register), authController.register)
router.post('/logout', validate(authSchema.logout), authController.logout)
//router.post('/forget-password', validate(authSchema.logout), authController.logout)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_req, res) => {
    // Successful authentication, redirect to the dashboard or any other route
    res.redirect('/dashboard');
  }
);

// router.post('/logout', logout)
router.get('/verify', authController.verify)

export default router