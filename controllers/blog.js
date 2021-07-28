const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
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

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  if (blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.url===undefined && blog.title===undefined){
    response.status(400).end()
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
