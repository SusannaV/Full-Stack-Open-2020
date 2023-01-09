var _ = require('lodash')

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

//Määrittele funktio mostBlogs, joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, jolla on eniten blogeja. 
//Funktion paluuarvo kertoo myös ennätysbloggaajan blogien määrän: {author: Robert C Martin, blogs: 3}
const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, 'author')
    const arr = Object.entries(count)
    sortedCount= arr.sort(function(a,b){
      return b[1] - a[1]
    })
    const winArr = sortedCount[0]
    return {
      'author': winArr[0],
      'blogs': winArr[1]
    }
}

//Määrittele funktio mostLikes, joka saa parametrikseen taulukollisen blogeja. Funktio selvittää kirjoittajan, 
//jonka blogeilla on eniten tykkäyksiä. Funktion paluuarvo kertoo myös suosikkibloggaajan likejen yhteenlasketun määrän:
// { author: "Edsger W. Dijkstra", likes: 17}

const mostLikes = (blogs) => {
  const mappedList = blogs.map(blog => ({author: blog.author, likes: blog.likes}))
   const sorted = _
   .chain(mappedList)
   .groupBy('author')
    .map((obj, key) => ({'author': key, 'likes': _.sumBy(obj, 'likes')}))
    .value();
    
    const result = _.maxBy(sorted, 'likes')

    console.log('result ',result)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}