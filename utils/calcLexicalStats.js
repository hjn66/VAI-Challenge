module.exports = (sentence, nonLexicals) => {
  const regex = /[\W]+/gi
  const words = sentence.replace(regex, ' ').trim().toLowerCase().split(' ')
  let lexicalCount = 0
  words.forEach(word => {
    if (!nonLexicals.includes(word)) {
      lexicalCount++
    }
  })
  return { lexicalCount, wordsCount: words.length }
}
