const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {

    if (blogs.length===0)
        return 0
    if (blogs.length === 1)
        return blogs[0].likes
    
    var likes = blogs.reduce((sum, post) => sum + post.likes,0)
        return likes
}

    // const reducer = (sum, item) => {
    //   return sum + item
    // }
  
    //     blogs.reduce(reducer, 0)






  
  module.exports = {
    dummy, totalLikes
  }