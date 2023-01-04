const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, t) => s + t.likes, 0)
}

const favoriteBlog = (blogs) => {
  //Funktio selvittää millä blogilla on eniten tykkäyksiä. Jos suosikkeja on monta, riittää että funktio palauttaa niistä jonkun.
  return blogs.reduce((max, b) => b.likes > max.likes ? b : max, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}