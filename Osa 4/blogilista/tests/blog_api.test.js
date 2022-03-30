const mongoose = require('mongoose')
const supertest = require('supertest')
//const { response } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const initialBlogs = [
  {
    title: 'This is the first blog of the initial blogs',
    author: 'Dr Who',
    url: 'url.com',
    likes: 50
  },
  {
    title: 'S3cond Bl0g!',
    author: 'Writer 2',
    url: 'mysecondblog.bloglist.org',
    likes: 1
  },
  {
    title: 'General food blog',
    author: 'Daisy',
    url: 'daisycooks.com',
    likes: 15
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})
describe('get method', () => {
  test('there are 3 blogs that are returned as json - 4.8', async () => {
    const response = await api.get('/api/blogs')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('The blogs have an "id"-field - 4.9', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})


describe('post method', () => {
  test('New blogs can be posted - 4.10', async () => {
    const newBlog =  {
      'title': 'Blog about coffee',
      'author': 'Barista B',
      'url': 'www.coffeeforlife.blog',
      'likes': 5
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(titles).toContain(
      'Blog about coffee')
  })


  test('If new blog has no likes, it is set to 0 - 4.11', async () => {
    const newBlog =  {
      'title': 'This is an unpopular blog',
      'author': 'Steve',
      'url': 'www.stevesblogaboutlifetheuniverseandeverything.blogspot.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body[3].likes).toBe(0)
  })


  test('If new blog has no title or url, 400 is returned - 4.12', async () => {
    const newBlog =  {
      'title': 'Phoebe\'s blog',
      'author': 'Princess Bananahammock',
      likes: 2
    }
    const blogWithBasicallyNothing = {
      'author': 'James Bond',
      'likes': 1
    }
    const blogWithMissingTitle = {
      'author': 'Hessu Hoopo',
      'url': 'www.hessunblogi.ankkalinna.fi',
      'likes': 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(blogWithBasicallyNothing)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(blogWithMissingTitle)
      .expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})


describe('delete method', () => {
  test('A blog can be removed - 4.13', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToDelete = blogs.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length-1)
    expect(response.body[0].title).toBe('S3cond Bl0g!')
  })
})

describe('put method', () => {
  test('A blog can be updated - 4.14', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToUpdate = blogs.body[1]
    const newNoteData =  {
      title: 'Second Blog - a new refined blog!',
      author: 'Writer 2',
      url: 'mysecondblog.bloglist.org',
      likes: 2
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newNoteData)
      .expect(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
    expect(response.body[1].title).toBe('Second Blog - a new refined blog!')
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'user1',
      name: 'Player 1',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters long')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'us',
      name: 'Player 1',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if there is no password', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'user2',
      name: 'Player 1'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be at least 3 characters long')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if there is no username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      name: 'Player 1',
      password: '123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` is required.')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })



})


afterAll(() => {
  mongoose.connection.close()
})
//tämän tiedoston testit saa suoritettua komennolla npm test -- tests/blog_api.test.js
//kunkin verbin testit voi suorittaa kommennolla
// npm test -- -t 'delete'
// npm test -- -t 'post'
// npm test -- -t 'get'