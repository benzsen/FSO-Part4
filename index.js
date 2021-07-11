const app = require("./app")
const http = require('http')
const Blog = require('./models/blog')
const config = require("./utils/config")

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

//const PORT = process.env.PORT
