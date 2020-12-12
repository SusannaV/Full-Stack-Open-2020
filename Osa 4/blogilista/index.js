const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')



const server = http.createServer(app)


// require('dotenv').config()
// const Blog = require('./models/blog')


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})