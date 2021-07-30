const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const uniqueValidator = require('mongoose-unique-validator')

usersRouter.post('/api/users', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if (body.password.length < 3 || body.username.length < 3){
    return response.status(401).json({error:"Invalid User and/or Password"})
  }

  const savedUser = await user.save(error=>{
    if (error){
      return response.status(400).json({error:"Username not unique"})
    }
    else{
      response.json(savedUser)
    }
  })
})

usersRouter.get('/api/users', async (req, res) => {
  // const users = User.find({})
  //   .then(users => {
  //     res.json(users)
  //   })
  const users = await User
    .find({}).populate("blogs")
  res.json(users)
})

module.exports = usersRouter
