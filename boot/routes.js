const bodyParser = require('body-parser')
const cors = require('cors')
require('express-async-errors')

const complexity = require('../routes/complexity')
const nonLexical = require('../routes/nonLexical')

module.exports = async function (app) {
  // CORS Middleware
  app.use(cors())

  // parse application/json
  app.use(bodyParser.json())

  app.use('/complexity', complexity)
  app.use('/non-lexicals', nonLexical)
}
