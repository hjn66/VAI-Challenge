const winston = require('winston')
const i18n = require('i18n')

module.exports = function (err, req, res, next) {
  winston.error({
    message: err.message + ' on ' + req.originalUrl,
    stack: err.stack
  })
  if (
    err instanceof ReferenceError ||
    err instanceof SyntaxError ||
    err instanceof TypeError
  ) {
    res.statusCode = 500
    res.json({ message: i18n.__('Server error occurred') })
  } else {
    res.statusCode = 400
    res.json({ message: i18n.__(err.message) })
  }
  next()
}
