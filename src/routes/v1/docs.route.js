const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc =  require('../../docs/swagger.doc')
const config = require('../../config/config')
const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;