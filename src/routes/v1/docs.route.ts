import express from 'express'
import swaggerUi from 'swagger-ui-express'
const swaggerDoc =  require('../../docs/swagger.doc')
import config from '../../config/config'
const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;