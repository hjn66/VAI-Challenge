const mongoose = require('mongoose')

// To fix all deprecation warnings
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env['database.connectionString'])

// Database connected
mongoose.connection.on('connected', () => {
  console.log('Connetcted to DataBase')
})

// Database connection Error
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
