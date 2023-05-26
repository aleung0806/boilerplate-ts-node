import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../app";
const api = supertest(app);
import User from '../../models/user.model'
import config from '../../config/config'
import { redisClient } from '../../db/redis'

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
})

describe('POST /v1/register', () => {
  test('should return 201 and return user on valid request', async () => {
    const res = await api
      .post('/v1/register')
      .send(user2)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    expect(res.body.user).toEqual({
      id: expect.anything(),
      email: user1.email,
      username: user1.username
    })

  })

  test('correct user created in db on valid request', async () => {
    const res = await api
      .post('/v1/register')
      .send(user2)

    const dbUser = await User.findOne({email: user1.email})
    expect(dbUser).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        email: user1.email,
        username: user1.username,
        password: expect.not.stringMatching(user1.password)
      })
    )
  })

  test('should return 400 if email is taken', async () => {
    const res = await api
      .post('/v1/register')
      .send({
        email: user1.email,
        username: user2.username,
        password: user2.password
      })
      .expect(400)

    expect(res.body.user).toBeUndefined()
  })

  test('should return 400 if username is not included', async () => {
    const res = await api
      .post('/v1/register')
      .send({
        email: user2.email,
        password: user2.password
      })
      .expect(400)

    expect(res.body.user).toBeUndefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
