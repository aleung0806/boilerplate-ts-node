const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const User = require('../../models/user.model')
const config = require('../../config/config')
const { redisClient } = require('../../db/redis')

const user1 = {
  email: 'user1@test.com',
  username: 'user1',
  password: 'password'
}

const user2 = {
  email: 'user2@test.com',
  username: 'user2',
  password: 'wordpass'
}

beforeEach(async () => {
  await mongoose.connect(config.mongoose.url)
  await User.deleteMany({})
})

describe('POST /v1/logout', () => {
  test('should return 204 on request with valid cookie', async () => {
    const res = await api
      .post('/v1/logout')
      .expect(204)

    expect(res.body.user).toBeUndefined()
  })

  test('should return 401 if cookie is expired', async () => {
    const res = await api
      .post('/v1/logout')
      .expect(401)

    expect(res.body.user).toBeUndefined()
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})
