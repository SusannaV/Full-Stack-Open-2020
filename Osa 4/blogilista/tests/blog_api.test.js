const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

test('there are 3 blogs that are returned as json - 4.8', async () => {
 const response = await api.get('/api/blogs');
  expect(response.statusCode).toBe(200);
  expect(response.type).toBe("application/json");
  expect(response.body).toHaveLength(initialBlogs.length);
})


test('The blogs have an "id"-field - 4.9', async () =>{
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
})


test('New blogs can be posted - 4.10', async () =>{
  const newBlog =  {
    "title": "Blog about coffee",
    "author": "Barista B",
    "url": "www.coffeeforlife.blog",
    "likes": 5
};
await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(titles).toContain(
    "Blog about coffee");
})


test('If new blog has no likes, it is set to 0 - 4.11', async () =>{
  const newBlog =  {
    "title": "This is an unpopular blog",
    "author": "Steve",
    "url": "www.stevesblogaboutlifetheuniverseandeverything.blogspot.com"
};
await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');
  expect(response.body[3].likes).toBe(0);
})


test('If new blog has no title or url, 400 is returned - 4.12', async () =>{
  const newBlog =  {
    "title": "Phoebe's blog",
    "author": "Princess Bananahammock",
    likes: 2
  };
  const blogWithBasicallyNothing = {
    "author": "James Bond",
    "likes": 1
  }
  const blogWithMissingTitle = {
    "author": "Hessu Hoopo",
    "url": "www.hessunblogi.ankkalinna.fi",
    "likes": 3
  }
await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400);
  await api
  .post('/api/blogs')
  .send(blogWithBasicallyNothing)
  .expect(400);
  await api
  .post('/api/blogs')
  .send(blogWithMissingTitle)
  .expect(400);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
})



afterAll(() => {
  mongoose.connection.close()
})
//tämän tiedoston testit saa suoritettua komennolla npm test -- tests/blog_api.test.js