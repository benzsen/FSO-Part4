
const mongoose = require('mongoose')

//const url = process.env.MONGODB_URI
const url = "mongodb+srv://admin-benzsen:test123@cluster0.ml9kl.mongodb.net/part4blogs?retryWrites=true&w=majority"
console.log("Connecting to: ",url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

//const Person = mongoose.model('Person', personSchema)
module.exports = mongoose.model('Blog', blogSchema)
