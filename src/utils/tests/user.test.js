const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const User = require('../../models/user.model')
const config = require('../../config/config')
const { redisClient } = require('../../db/redis');
const logger = require("../logger");

 const user1 =  {
  email: 'user1@test.com',
  username: 'user1',
  password: 'password'
}
const user2 = {
  email: 'user2@test.com',
  username: 'user2',
  password: 'wordpass'
}
const user3 = {  
  email: 'user3@test.com',
  username: 'user3',
  password: 'passpass'
}

const users = [ user1, user2, user3 ]

const newUser = {
  email: 'newuser@test.com',
  username: 'newuser',
  password: 'wordpass'
}

beforeAll(async () => {
  await mongoose.connect(config.mongoose.url)
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(users)
})

describe('/v1/users', () => { 
  describe('GET /v1/users', () => {
    test('should return all users on correct request', async () => {
      const res = await api
        .get('/v1/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(res.body.users).toHaveLength(3)
      expect(res.body.users).toContainEqual({
          id: expect.anything(),
          email: 'user3@test.com',
          username: 'user3',
        })
    }) 
  })

  describe('POST /v1/users', () => {
    test('should create and return user on correct request', async () => {
      const res = await api
      .post('/v1/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      expect(res.body.user).toEqual({
        id: expect.anything(),
        email: newUser.email,
        username: newUser.username
      })

      const dbUser = await User.findOne({email: newUser.email})
      expect(dbUser).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          email: newUser.email,
          username: newUser.username,
          password: expect.not.stringMatching(newUser.password)
        })
      )
    }) 
  })

  describe('GET /v1/users/:id', () => {
    test('should get user on correct request', async () => {
      const user = await User.findOne({})
      const res = await api
        .get(`/v1/users/${user.id}`)
        .expect(200)

      expect(res.body.user).toEqual({
        id: user.id,
        email: user.email,
        username: user.username
      })

    }) 
  })
  
  describe('PATCH /v1/users/:id', () => {
    test('should patch user on correct request', async () => {
      const user = await User.findOne({})
      const newUsername = 'brandNewUsername'
      const res = await api
        .patch(`/v1/users/${user.id}`)
        .send({id: user.id, username: newUsername})
        .expect(200)

      expect(res.body.user).toEqual({
        id: user.id,
        email: user.email,
        username: newUsername
      })

      const dbUser = await User.findOne({email: newUser.email})
      expect(dbUser).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          email: newUser.email,
          username: newUsername,
        })
      )
    }) 
  })

  describe('DELETE /v1/users', () => {
    test('should delete users on correct request', async () => {
      const res = await api
      .delete('/v1/users')
      .send(newUser)
      .expect(204)

      expect(res.body.user).toBeUndefined()

      const dbUsers = await User.find({})
      expect(dbUsers).toHaveLength(0)
    }) 
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
