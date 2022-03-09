const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response, next) => {
    //find on Mongoosen oma query, älä hämmenny
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
      })

      const result = await blog.save()
      response.status(201);
      response.json(result)
  })

  blogsRouter.delete('/:id', async(request, response, next) => {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    }

      const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
      response.status(200)
      response.json(returnedBlog)
  })


  module.exports = blogsRouter