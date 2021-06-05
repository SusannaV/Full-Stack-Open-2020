const { last } = require("lodash");
const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};


const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0].likes;

  var likes = blogs.reduce((sum, post) => sum + post.likes, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0];

  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );
  return max;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorWithMostBlogs = _.chain(blogs)
  .countBy('author')
  .toPairs()
  .last()
  .value()

  var stringed = authorWithMostBlogs.toString().split(',');
  const author = {"author": stringed[0], "blogs": parseInt(stringed[1])}

 return author;
};



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
