const logger = require('./logger')
const jwt = require("jsonwebtoken")

const reqLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    const returnToken=authorization.substring(7)
    req.token=returnToken
    next()
    return
    //This order matters
  }
  req.token=null
  next()
  return
}

const userExtractor = (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id){
    next()
    return res.status(401).json({error: 'token missing or invalid'})
  }
  else{
    req.user = decodedToken
    next()
    return
  }
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint test' })
}

module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
