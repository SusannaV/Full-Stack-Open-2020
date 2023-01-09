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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'ToBeRemoved', author: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}