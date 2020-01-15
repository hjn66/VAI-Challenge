const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
require('express-async-errors')

const complexity = require('../routes/complexity')
const nonLexical = require('../routes/nonLexical')
const user = require('../routes/user')

module.exports = async function (app) {
  // CORS Middleware
  app.use(cors())

  // parse application/json
  app.use(bodyParser.json())

  // Passport Middleware
  app.use(passport.initialize())
  app.use(passport.session())
  require('../middlewares/passport')(passport)

  app.use('/complexity', complexity)
  app.use('/non-lexicals', nonLexical)
  app.use('/users', user)
}
