const mongoose = require('mongoose')

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

//const Person = mongoose.model('Person', personSchema)
module.exports = mongoose.model('Blog', blogSchema)
