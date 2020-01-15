const calcLexicalStats = require('../../utils/calcLexicalStats')

const Joi = require('joi')
function _validateRequestData (req) {
  const schema = Joi.object({
    text: Joi.string().required()
  })
  return Joi.validate(req, schema)
}

module.exports = async (req, resp) => {
  // data existance validation
  const { error } = _validateRequestData(req.body)
  if (error) {
    throw new Error(error.details[0].message)
  }
  const text = req.body.text
  const words = text.replace(/[\W]+/gi, ' ').trim().toLowerCase().split(' ')
  if (text.length > 1000 && words.length > 100) {
    throw new Error('text length must be less than or equal to 100 words and 1000 characters')
  }
  const nonLexicals = ['to', 'got', 'is', 'have', 'and', 'although', 'or', 'that', 'when', 'while', 'a', 'either', 'more', 'much', 'neither', 'my', 'that', 'the', 'as', 'no', 'nor', 'not', 'at', 'between', 'in', 'of', 'without', 'I', 'you', 'he', 'she', 'it', 'we', 'they', 'anybody', 'one']

  // non-verbose Mode
  const lexicalStat = calcLexicalStats(text, nonLexicals)
  const overallLD = (lexicalStat.lexicalCount / lexicalStat.wordsCount).toFixed(2)
  resp.send(
    { data: { overall_ld: overallLD, words: text.length } }
  )
}
