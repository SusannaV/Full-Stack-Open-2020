const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response  = await api.get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)
})

test('blogs are identified by id', async () => {
  const response  = await api.get('/api/blogs')
     .expect(200)
     .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
})



afterAll(() => {
  mongoose.connection.close()
})