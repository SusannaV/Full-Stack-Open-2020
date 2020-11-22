const http = require('http')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Blog = require('./models/blog')

  app.use(cors())
  app.use(express.json())

  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(requestLogger)
  


  app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }) 
  })


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })