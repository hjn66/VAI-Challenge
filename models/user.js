const mongoose = require('mongoose')

// user Schema
const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() }
})

module.exports = mongoose.model('User', UserSchema)
