//const { last } = require('lodash')
const _ = require('lodash')
const User = require('../models/user')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes

  var likes = blogs.reduce((sum, post) => sum + post.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0]

  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
  return max
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorWithMostBlogs = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .last()
    .value()

  var stringed = authorWithMostBlogs.toString().split(',')
  const author = { 'author': stringed[0], 'blogs': parseInt(stringed[1]) }

  return author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorsLikes = _.chain(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes')
    }))
    .value()

  const authorWithMostLikes = _.maxBy(authorsLikes, 'likes')
  return authorWithMostLikes
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}
