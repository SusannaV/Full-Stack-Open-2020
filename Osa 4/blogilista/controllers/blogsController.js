const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const findUserAndValidateToken = (request, response) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  return decodedToken.id
}

blogsRouter.get('/', async (request, response) => {
  //find on Mongoosen oma query, älä hämmenny
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = findUserAndValidateToken(request, response)
  const user = await User.findById(userId)

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
  response.json(result)
})

blogsRouter.delete('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  // eslint-disable-next-line no-undef
  const userId = findUserAndValidateToken(request, response)
  const user = await User.findById(userId)
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