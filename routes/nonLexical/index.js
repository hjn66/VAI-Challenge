const router = require('express').Router()
const addNonLexical = require('./addNonLexical')
const listNonLexicals = require('./listNonLexicals')

router.post('/', addNonLexical)
router.get('/', listNonLexicals)

module.exports = router
