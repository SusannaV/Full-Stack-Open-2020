const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response, next) => {
    console.log("You summoned?")
    //find on Mongoosen oma query, älä hämmenny
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()))
  })

  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }) 
  })

  module.exports = blogsRouter