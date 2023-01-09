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
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
})

test('blogs are identified by id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Ghostwriter',
    url: 'www.newblog.com',
    likes: 5465465465465468
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'New Blog'
  )
})

test('if blog is not given a value for likes, it is 0', async () => {
  const newBlog = {
    title: 'Unpopular blog',
    author: 'Ghostwriter',
    url: 'www.noonereadsme.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body[helper.initialBlogs.length]
  expect(addedBlog.likes).toEqual(0)
})

//Tee testit blogin lisäämiselle eli osoitteeseen /api/blogs tapahtuvalle HTTP POST -pyynnölle.
//Testin tulee varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url,
//pyyntöön vastataan statuskoodilla 400 Bad Request.

test('a blog has to have a title and an url', async () => {
  const blogWithoutTitle = {
    author: 'Ghostwriter',
    url: 'www.unnamedblog.com'
  }

  const blogWithoutUrl = {
    title: 'Blog without an url',
    author: 'Ghostwriter'
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  const titles = response.body.map(r => r.title)
  expect(titles).not.toContain('Blog without an url')
  const urls = response.body.map(r => r.url)
  expect(urls).not.toContain('www.unnamedblog.com')
})


afterAll(() => {
  mongoose.connection.close()
})
