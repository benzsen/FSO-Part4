const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const middleware = require('../utils/middleware')

blogRouter.get('/api/blogs/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate("user", {name:1, username:1})
    res.json(blogs)
})

blogRouter.get('/api/blogs/:id', async (req, res) => {
  const id = (req.params.id)
  const foundBlog = await Blog
    .findById(id)
    .populate("user", {name:1, username:1})
  if (foundBlog) {
    res.json(foundBlog)
  }
  else{
    res.status(404).end()
  }
})

//Part4.21
blogRouter.delete('/api/blogs/:id', middleware.userExtractor, async (req, res) => {
  //blog id
  const id = (req.params.id)
  // const token = req.token
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  //const foundBlog = await Blog.findByIdAndRemove(id)
  const foundBlog = await Blog.findById(id)

  if (foundBlog.user.toString() === req.user.id.toString()){
    const deleteBlogName = foundBlog.title;
    Blog.findByIdAndRemove(id)
      .then(result=>{
        console.log("Deleted "+deleteBlogName+"from blog list");
        res.status(204).end()
      })
      .catch(error => next())
  }
  else{
    res(401).end()
    .catch(error => next())
  }

})

blogRouter.put('/api/blogs/:id', async (req, res, next) => {
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

//Part4.20 Token Middleware (req.token)
blogRouter.post('/api/blogs/', middleware.userExtractor, async (req, res) => {
const body = req.body

const user = await User.findById(req.user.id)

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
    res.status(400).end()
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()
  res.status(201).json(savedBlog)
})

module.exports = blogRouter
