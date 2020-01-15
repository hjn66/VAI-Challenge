const NonLexical = require('../../models/nonLexical')

module.exports = async word => {
  const result = await NonLexical.findOne({ word })
  if (result) {
    throw new Error('This word already exists')
  }
  const newWord = new NonLexical({ word })
  return newWord.save()
}
