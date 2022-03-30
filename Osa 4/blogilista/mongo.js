const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl  =
  `mongodb+srv://fullstackuser:${password}@blogilista.btj9r.mongodb.net/blogilista?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blogi = new Blog({
  title: 'Title 123',
  author: 'Author Authoripants',
  url: 'www.url.com',
  likes: 1
})

blogi.save().then(response => {
  console.log('blog saved!')
  mongoose.connection.close()
})