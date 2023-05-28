import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";
const api = supertest(app);
import User from '../../src/models/user.model'
import config from '../../src/config/config'
import { redisClient } from '../../src/db/redis'

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
