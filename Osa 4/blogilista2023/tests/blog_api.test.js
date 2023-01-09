const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testblog',
    author: 'Ghostwriter',
    url: 'www.testblog.com',
    likes: 5
  },
  {
    title: 'Blog for testers',
    author: 'Ghostwriter',
    url: 'www.testerlife.com',
    likes: 72
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  const response  = await api.get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)

})

afterAll(() => {
  mongoose.connection.close()
})