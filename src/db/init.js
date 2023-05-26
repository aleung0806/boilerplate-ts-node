const mongoose = require('mongoose')
const User = require('../models/user')

const users = [

]

const initTestDb = async () => {
  await User.deleteMany({})
}

module.exports = {
  initTestDb
}

