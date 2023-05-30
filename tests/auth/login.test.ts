import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";
const api = supertest(app);
import User from '../../src/models/user.model'
import config from '../../src/config/config'
import { redisClient } from '../../src/db/redis'
import logger from "../../src/utils/logger";

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
  await api.post('/v1/register').send(user1)
  await redisClient.flushDb()
})


describe('POST /v1/login', () => {
  test('should return 200, user object, and session cookie if login is valid', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: user1.email,
        password: user1.password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.user).toEqual(
      expect.objectContaining({
        email: user1.email,
        username: user1.username
      })
    )
    console.log(res.header['set-cookie'][0])
    expect(res.header['set-cookie'][0]).toMatch(/^sessionId=/)

  })

  test('should return 401 if email does not exist in db', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: user2.email,
        password: user2.password
      })
      .expect(401)
      
      expect(res.body.user).toBeUndefined()
  })

  test('should return 400 if email is not in request body', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        username: user1.username,
        password: user1.password
      })
      .expect(400)
      
      expect(res.body.user).toBeUndefined()
  })

  test('should return 400 if email does not appear to be an email', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: '123456',
        password: user1.password
      })
      .expect(400)
      
      expect(res.body.user).toBeUndefined()
  })
})

afterAll(async () => {
 
  await mongoose.connection.close()
})
