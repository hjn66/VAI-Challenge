const assert = require('assert')

describe('VAI Challenge Unit Test', () => {
  describe('calcLexicalStats', () => {
    it('should calculate lexical words count in sentences', async () => {
      const calcLexicalStats = require('../utils/calcLexicalStats')
      const sentence = 'Kim loves going ​ to the ​ cinema'
      const nonLexical = ['to', 'got', 'is', 'have', 'and', 'although', 'or', 'that', 'when', 'while', 'a', 'either', 'more', 'much', 'neither', 'my', 'that', 'the', 'as', 'no', 'nor', 'not', 'at', 'between', 'in', 'of', 'without', 'I', 'you', 'he', 'she', 'it', 'we', 'they', 'anybody', 'one']
      const lexicalStats = calcLexicalStats(sentence, nonLexical)
      assert.strictEqual(lexicalStats.lexicalCount, 4)
      assert.strictEqual(lexicalStats.wordsCount, 6)
    }).timeout(10000)
  })
})
