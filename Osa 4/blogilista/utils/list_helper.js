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
  let authors = _.map(blogs, (entry) => entry.author);
  let tally = _.reduce(
    authors,
    (total, next) => {
      //console.log("this is  total", total);
      //console.log("this is next:", next);
      total[next] = (total[next] || 0) + 1;
      return total;
    },
    {}
  );
  console.log(tally);
  let mostBlogs = _.reduce(tally, (prev, current) =>
    prev[1] > current[1] ? prev : current
  );
  console.log(mostBlogs);
  return mostBlogs;
};

const thisIsATest = (blogs) => {
  let words = [
    "sky",
    "forest",
    "wood",
    "sky",
    "rock",
    "cloud",
    "sky",
    "forest",
    "rock",
    "sky",
  ];

  let tally = _.reduce(
    words,
    (total, next) => {
      total[next] = (total[next] || 0) + 1;
      console.log("this is test next", next);
      console.log("this is test total", total);
      return total;
    },
    {}
  );

  console.log(tally);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  thisIsATest,
};
