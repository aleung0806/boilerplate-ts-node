const express = require('express')
const testController = require('../../controllers/test.controller')


const router = express.Router()


router.get('/test', testController.test)

// router.post('/logout', logout)
// router.get('/verify', verify)


module.exports = router