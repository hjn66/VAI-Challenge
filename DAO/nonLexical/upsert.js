const NonLexical = require('../../models/nonLexical')

module.exports = async word => {
  const result = await NonLexical.findOne({ word })
  if (!result) {
    const newWord = new NonLexical({ word })
    return newWord.save()
  }
}
