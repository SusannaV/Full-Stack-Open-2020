const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if(!user){
    response.status(401).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  await blog.populate('user', { username: 1, name: 1, id: 1 })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  if(body.likes){
    const blog = new Blog({
      likes: body.likes,
    })

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id,  { likes: blog.likes }, { new: true })
    response.status(200).json(savedBlog)
  } else {
    response.status(400).end()
  }

})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    response.status(404).end()
  }
  const user = request.user
  if(user._id.toString() === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    response.status(401).end()
  }
})

module.exports = blogsRouter
