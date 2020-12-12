const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//tää ei nyt ole käytössä ollenkaan
// blogsRouter.get('/', (request, response) => {
//     console.log("You summoned?")
//     Blog.find({}).then(blogs => {
//       response.json(blogs.map(blog => blog.toJSON()))
//     })
//   })

  blogsRouter.get('/', (request, response, next) => {
    console.log("You summoned?")
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
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