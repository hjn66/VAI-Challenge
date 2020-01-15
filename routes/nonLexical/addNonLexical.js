const Joi = require('joi')
const addNonLexical = require('../../DAO/nonLexical/add')

function _validateRequestData (req) {
  const schema = Joi.object({
    word: Joi.string().required().max(1000)
      .regex(/[a-zA-Z]+/)

  })
  return Joi.validate(req, schema)
}

module.exports = async (req, resp) => {
  // data existance validation
  const { error } = _validateRequestData(req.body)
  if (error) {
    throw new Error(error.details[0].message)
  }
  const word = await addNonLexical(req.body.word)

  return resp.send({
    word
  })
}
