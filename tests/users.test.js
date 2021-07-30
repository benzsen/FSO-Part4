//Complete Part 4.16
//Cannot run both test at once
//"MongoDB E11000 duplicate key error"
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require("../models/user")
const usersRouter = require("../controllers/user")

describe("Signup Validation",()=>{

  const initialUsers = {
    username:"dilzsen",
    name:"Dil",
    password:"29219"
  }

  beforeEach(async () => {
    await User.deleteMany({})
    const usersObject = new User(initialUsers)
    const promiseArray = usersObject.save()
    //usersRouter.post(initialUser);
  })

  test("invalid password", async () => {
    const invalidPassword = {
      username:"Bobby",
      name:"Bob",
      password:"2"
    }

    await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(401)
  })

  test.only("Duplicate Username", async () => {
    // await User.deleteMany({})
    // const usersObject = new User(initialUsers)
    // const promiseArray = usersObject.save()

    const duplicateUsername = {
      username:"dilzsen",
      name:"Dilys",
      password:"6545121"
    }

    await api
      .post('/api/users')
      .send(duplicateUsername)
      .expect(400)
      .expect('{"error":"Username not unique"}')
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
