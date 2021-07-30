const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/api/blogs', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate("user", {name:1, username:1})
    res.json(blogs)

})

blogRouter.delete('/api/blogs/:id', (req, res) => {
  const id = (req.params.id)

  Blog.findByIdAndRemove(id)
    .then(result=>{
      res.status(204).end()
    })
    .catch(error => next())

  res.status(204).end()
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

blogRouter.post('/api/blogs', async (request, response) => {
const body = request.body
//const user = await User.findById(body.userId)
const user = await User.findOne()

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
