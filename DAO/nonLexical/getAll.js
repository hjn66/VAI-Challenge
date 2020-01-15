const NonLexical = require('../../models/nonLexical')

module.exports = async () => {
  const nonlexicals = await NonLexical.find({}, '-_id -__v')
  return nonlexicals.map(item => {
    return item.word
  })
}
