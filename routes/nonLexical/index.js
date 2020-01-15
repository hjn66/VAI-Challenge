const passport = require('passport')
const router = require('express').Router()
const addNonLexical = require('./addNonLexical')
const listNonLexicals = require('./listNonLexicals')

router.post('/', passport.authenticate('jwt', { session: false }), addNonLexical)
router.get('/', passport.authenticate('jwt', { session: false }), listNonLexicals)

module.exports = router
