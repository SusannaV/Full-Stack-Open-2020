const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response, next) => {
    console.log("You summoned?")
    //find on Mongoosen oma query, älä hämmenny
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try{
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
      })

      const result = await blog.save()
      response.status(201);
      response.json(result)
    }
    catch (error){
      return next(error)
    } 
  })

  module.exports = blogsRouter