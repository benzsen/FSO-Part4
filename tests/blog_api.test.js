//Complete Part 4.8-4.10
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  {
  // let blogsObject = new Blog(initialBlogs[0])
  // await blogsObject.save()
  // blogsObject = new Blog(initialBlogs[1])
  // await blogsObject.save()

  // initialBlogs.forEach(async(blog) => {
  //   let blogsObject = new Blog(blog)
  //   await blogsObject.save()
  // })
  }

  const blogsObject = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsObject.map(blog => blog.save())
  Promise.all(promiseArray)
})

test.only('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('Correct number of blogs', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(initialBlogs.length)
}, 100000)

//lazy way [0]
test("id not _id", async () =>{
  const res = await api.get('/api/blogs')
  console.log(res);
  expect(res.body[0].id).toBeDefined()
}, 100000)

//4.10
test("Posting new blog", async() =>{
  const newBlog = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }]

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)

  const res = await api.get("/api/blogs")
  expect(res.body).toHaveLength(initialBlogs.length + 1)
}, 100000)

//4.11
test("Missing Like Data", async()=>{
  const missingLikes = {
    _id: "5a422aa71b54a676234d17f9",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    //likes: 5,
    __v: 0
  }
  await api
    .post("/api/blogs")
    .send(missingLikes)

  const res = await api.get('/api/blogs')
  res.body.forEach(blog => {
  expect(blog.likes).toBeDefined()
  })
}, 100000)

test("Missing Title/URL data", async() =>{
  const missingTitleURL = {
    _id: "5a422aa71b54a676234d17f7",
    //title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    //url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
  await api
    .post("/api/blogs")
    .send(missingTitleURL)
    .expect(400)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
