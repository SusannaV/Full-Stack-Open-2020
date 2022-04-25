const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  //find on Mongoosen oma query, älä hämmenny
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201)
  response.json(result)
})

blogsRouter.delete('/:id', userExtractor,  async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if ( blog.user._id.toString() !== user._id.toString() ){
    return response.status(403).json({ error: 'blog can only be deleted by the person who originally added it' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.status(200)
  response.json(returnedBlog)
})


module.exports = blogsRouter