const mongoose = require('mongoose')

// nonLexical Schema
const NonLexicalSchema = mongoose.Schema({
  word: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, required: true, default: Date.now() }
})

module.exports = mongoose.model('NonLexical', NonLexicalSchema)
