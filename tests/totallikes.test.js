//Completed Part 4.1-4.4

const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []
//
//   const result = listHelper.dummy(blogs);
//   expect(result).toBe(1)
// })

describe("Total likes",()=>{
  const noBlog = []
  const oneBlog = [
    {
     _id: '5a422aa71b54a676234d17f8',
     title: 'Go To Statement Considered Harmful',
     author: 'Edsger W. Dijkstra',
     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
     likes: 5,
     __v: 0
   }
 ]
  const sixBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
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

  test('no blog', () => {
    const result = listHelper.totalLikes(noBlog)
    expect(result).toBe(0)
  })

  test('one blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(5)
  })

  test('multiple blog', () => {
    const result = listHelper.totalLikes(sixBlogs)
    expect(result).toBe(36)
  })

})
