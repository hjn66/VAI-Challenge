const fs = require('fs')
const readline = require('readline')
const upsertNonLexical = require('../DAO/nonLexical/upsert')

module.exports = async () => {
  const fileStream = fs.createReadStream(process.env['initNonlexicals.path'])

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    await upsertNonLexical(line)
  }
}
