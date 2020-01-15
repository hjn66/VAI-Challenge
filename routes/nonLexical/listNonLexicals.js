const getNonLexicals = require('../../DAO/nonLexical/getAll')

module.exports = async (req, resp) => {
  const words = await getNonLexicals()

  return resp.send({
    words
  })
}
