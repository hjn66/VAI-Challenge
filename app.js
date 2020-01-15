const express = require('express')
require('dotenv').config()
const errors = require('./middlewares/errors')
require('./middlewares/logging')()

global.rootPath = __dirname

const app = express()

require('./boot/routes')(app)
require('./boot/database')
require('./boot/initNonLexicals')()
require('./boot/addAdmin')()
require('./boot/i18n')
app.use(errors)

const port = process.env['server.port']

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
