const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const uniqueValidator = require('mongoose-unique-validator')
const middleware = require('../utils/middleware')

// const userExtractor = (req, res, next) => {
//   const token = req.token
//   console.log("userExtractor", token);
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!token || !decodedToken.id){
//     next()
//     return res.status(401).json({error: 'token missing or invalid'})
//   }
//   else{
//     req.user = decodedToken
//     console.log("decodedToken", decodedToken);
//     next()
//     return decodedToken.id
//   }
// }

usersRouter.post('/', async (request, response) => {
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
      console.log("FailsavedUser");
      return response.status(400).json({error:"Username not unique"})
    }
    else{
      console.log("savedUser", savedUser);
      return response.json(savedUser)
    }
  })
})

usersRouter.get('/', async (req, res) => {
  // const users = User.find({})
  //   .then(users => {
  //     res.json(users)
  //   })

  const users = await User
    .find({}).populate("blogs", {title:1, url:1, likes:1})
    res.json(users)
})

module.exports = usersRouter
