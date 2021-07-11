const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', (req, res) => {
  console.log("received get request");
  Blog
    .find({})
    .then(blogs => {
      console.log(blogs);
      res.json(blogs)
    })
})

blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
