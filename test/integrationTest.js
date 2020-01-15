const assert = require('assert')
const axios = require('axios')
require('dotenv').config()

describe('VAI Challenge Integration Test', () => {
  const hostUrl = 'http://localhost:' + process.env['server.port']

  describe('getComplexity', () => {
    it('should call /complexity and retun lexical density', async () => {
      const url = `${hostUrl}/complexity/`

      const data = { text: 'Kim loves going ​ to the ​ cinema' }
      const headers = {}

      const result = await axios.post(url, data, headers)

      assert.strictEqual(result.data.data.overall_ld, '0.67')
    }).timeout(10000)
    it('should call /complexity with more than 1000 characters and retun error', async () => {
      const url = `${hostUrl}/complexity/`
      const text = 'Creates code lens before each describe, it, suite and test function call in test files.' +
        ' Lense on it and test function shows last test result and can be used to run given test' +
        ' (using mocha --grep pattern - tests titles needs to be unique otherwise more than one test will be executed).' +
        ' Lense on describe and suite shows aggregated results from nested it and test and can be used to run all tests' +
        ' in given group / only test with specific status. To run tests that need to be transpiled' +
        ' (es6 with imports, typescript, ..) are supported using one of the two following methods:' +
        ' To ensure Mocha test runner works property don\'t forget to set the mocha.nodeExec variable in your settings.' +
        ' This method is useful if you want to provide your own transpile command, and want to map the resulting build' +
        ' directory to your source directory. see example projects in .vscode-test directory. Mocha is searching for transpiled' +
        ' scripts tests (configurable - mocha.glob) in project root directory or in mocha.sourceDir (appended to' +
        'project root directory - used in tandem with mocha.outputDir for non es5 sources - see examples).'
      const data = { text }
      const headers = {}
      try {
        await axios.post(url, data, headers)
      } catch (error) {
        assert.strictEqual(error.response.status, 400)
        assert.strictEqual(error.response.data.message, 'text length must be less than or equal to 100 words and 1000 characters')
      }
    }).timeout(10000)
    it('should call /complexity verbose mode and retun lexical density of sentences', async () => {
      const url = `${hostUrl}/complexity/?mode=verbose`

      const data = { text: 'Kim loves going to the cinema. I love To watch film in home. Text length must be less than or equal to 100 words' }
      const headers = {}

      const result = await axios.post(url, data, headers)
      assert.strictEqual(result.data.data.sentence_ld.length, 3)
      assert.strictEqual(result.data.data.sentence_ld[0], (4 / 6).toFixed(2).toString())
      assert.strictEqual(result.data.data.sentence_ld[1], (4 / 7).toFixed(2).toString())
      assert.strictEqual(result.data.data.sentence_ld[2], (9 / 11).toFixed(2).toString())
      assert.strictEqual(result.data.data.overall_ld, (17 / 24).toFixed(2).toString())
    }).timeout(10000)
  })
  describe('nonLexials', () => {
    it('should call /non-lexical and add new word to nonLexicals', async () => {
      const url = `${hostUrl}/non-lexicals/`
      const word = 'over'
      const data = { word }
      const headers = {}
      const result = await axios.post(url, data, headers)
      assert.strictEqual(result.data.word.word, word)
    }).timeout(10000)
    it('should call /non-lexical and add existed word to nonLexicals and raise error', async () => {
      const url = `${hostUrl}/non-lexicals/`
      const word = 'over'
      const data = { word }
      const headers = {}
      try {
        await axios.post(url, data, headers)
      } catch (error) {
        assert.strictEqual(error.response.status, 400)
        assert.strictEqual(error.response.data.message, 'This word already exists')
      }
    }).timeout(10000)
    it('should get /non-lexical and return list of nonLexicals', async () => {
      const url = `${hostUrl}/non-lexicals/`
      const result = await axios.get(url)
      assert.strictEqual(result.data.words.length, 36)
    }).timeout(10000)
  })
})
