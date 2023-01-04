const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, t) => s + t.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}