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

describe('GET blogs', () => {
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
})

describe('POST method', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Ghostwriter',
      url: 'www.newblog.com',
      likes: 5465465465465468,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const contents = blogs.map((r) => r.title)
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('New Blog')
  })

  test('if blog is not given a value for likes, it is 0', async () => {
    const newBlog = {
      title: 'Unpopular blog',
      author: 'Ghostwriter',
      url: 'www.noonereadsme.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const addedBlog = blogs[helper.initialBlogs.length]
    expect(addedBlog.likes).toEqual(0)
  })

  test('a blog has to have a title and an url', async () => {
    const blogWithoutTitle = {
      author: 'Ghostwriter',
      url: 'www.unnamedblog.com',
    }

    const blogWithoutUrl = {
      title: 'Blog without an url',
      author: 'Ghostwriter',
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

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
    const titles = blogs.map((r) => r.title)
    expect(titles).not.toContain('Blog without an url')
    const urls = blogs.map((r) => r.url)
    expect(urls).not.toContain('www.unnamedblog.com')
  })
})

describe('DELETE method', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const contents = blogsAtStart.map((r) => r.title)
    expect(contents).toContain('Testblog')
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    const newContents = blogsAtEnd.map((r) => r.title)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(newContents).not.toContain('Testblog')
  })

  test('deletion fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('PUT method', () => {
  test('a blog can be modified', async () => {
    const modifiedBlog = {
      likes: 10005,
    }
    const blogs = await helper.blogsInDb()
    const idOfBlogToModify = blogs[0].id
    expect(blogs[0].likes).toEqual(5)
    // title: 'Testblog',
    // author: 'Ghostwriter',
    // url: 'www.testblog.com',
    // likes: 5

    await api
      .put(`/api/blogs/${idOfBlogToModify}`)
      .send(modifiedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs2 = await helper.blogsInDb()
    expect(blogs2[0].likes).toEqual(10005)
  })

  test('modification requires a number for like', async () => {
    const modifiedBlog = {
    }
    const blogs = await helper.blogsInDb()
    const idOfBlogToModify = blogs[0].id
    expect(blogs[0].likes).toEqual(5)
    // title: 'Testblog',
    // author: 'Ghostwriter',
    // url: 'www.testblog.com',
    // likes: 5
    console.log(blogs[0])
    await api
      .put(`/api/blogs/${idOfBlogToModify}`)
      .send(modifiedBlog)
      .expect(400)

    const blogs2 = await helper.blogsInDb()
    console.log(blogs2[0])
    expect(blogs2[0].likes).toEqual(5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
