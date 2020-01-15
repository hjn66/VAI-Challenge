const getNonLexicals = require('../../DAO/nonLexical/getAll')
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
  const nonLexicals = await getNonLexicals()

  if (req.query.mode === 'verbose') {
    // verbose Mode
    const sentences = text.split('.')
    const sentenceLDs = []
    let totalWords = 0
    let totalLexicals = 0
    sentences.forEach(sentence => {
      const lexicalStat = calcLexicalStats(sentence, nonLexicals)
      sentenceLDs.push((lexicalStat.lexicalCount / lexicalStat.wordsCount).toFixed(2))
      totalWords += lexicalStat.wordsCount
      totalLexicals += lexicalStat.lexicalCount
    })
    const overalLD = (totalLexicals / totalWords).toFixed(2)
    resp.send(
      { data: { sentence_ld: sentenceLDs, overall_ld: overalLD } }
    )
  } else {
    // non-verbose Mode
    const lexicalStat = calcLexicalStats(text, nonLexicals)
    const overallLD = (lexicalStat.lexicalCount / lexicalStat.wordsCount).toFixed(2)
    resp.send(
      { data: { overall_ld: overallLD } }
    )
  }
}
