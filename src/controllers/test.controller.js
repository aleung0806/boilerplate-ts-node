const { StatusCodes } = require('http-status-codes')
const logger = require('../utils/logger')
const { redisClient } = require('../db/redis')
const emailService = require('../services/email.service')

const test = async (req, res, next) => {
  await emailService.sendEmail('shelbytinaza@gmail.com')
  res.status(StatusCodes.OK).send('test')
}

module.exports = {
  test
}