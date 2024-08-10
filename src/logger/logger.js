const pinoLogger = require('pino')()

const logger = (req, res, next) => {
  const { method, url } = req
  const invocateTime = new Date()
  pinoLogger.info(`Request  | URL: ${url} Method: ${method}`)
  res.on('finish', () => {
    const totalTime = new Date() - invocateTime
    pinoLogger.info(`Response | URL: ${url} Method: ${method} Code: ${res.statusCode} Total time: ${totalTime}ms `)
  })

  next()
}

module.exports = { logger };
