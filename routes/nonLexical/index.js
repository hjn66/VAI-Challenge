const router = require('express').Router()
const addNonLexical = require('./addNonLexical')

router.post('/', addNonLexical)

module.exports = router
