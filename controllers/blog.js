const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require("jsonwebtoken")

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate("user", {name:1, username:1})
    res.json(blogs)

})

blogRouter.delete('/:id', (req, res) => {
  const id = (req.params.id)

  Blog.findByIdAndRemove(id)
    .then(result=>{
      res.status(204).end()
    })
    .catch(error => next())

  res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => next(error))
})

//Part4.19 Token Authorization
// const getTokenFrom = req => {
//   const authorization = req.get("authorization")
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")){
//     return authorization.substring(7)
//   }
//   return null
// }

//Part4.20 Token Middleware (request.token)
blogRouter.post('/', async (request, response) => {
const body = request.body
//const token = getTokenFrom(request)
const token = request.token
console.log(token);
const decodedToken = jwt.verify(token, process.env.SECRET)

if (!token || !decodedToken.id){
  return response.status(401).json({error: 'token missing or invalid'})
}

//const user = await User.findById(body.userId)
//const user = await User.findOne()
const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.url===undefined && blog.title===undefined){
    response.status(400).end()
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()
  response.status(201).json(savedBlog)

})

module.exports = blogRouter
