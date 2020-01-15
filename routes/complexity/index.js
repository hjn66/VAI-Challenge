const router = require('express').Router()
const getComplexity = require('./getComplexity')

router.post('/', getComplexity)

module.exports = router
