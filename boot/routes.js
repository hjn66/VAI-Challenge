const bodyParser = require('body-parser')
const cors = require('cors')
require('express-async-errors')

module.exports = async function (app) {
  // CORS Middleware
  app.use(cors())

  // parse application/json
  app.use(bodyParser.json())
}
