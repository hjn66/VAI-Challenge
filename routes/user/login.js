const login = require('../../DAO/user/login')
const jwt = require('jsonwebtoken')

const Joi = require('joi')
function _validateRequestData (req) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
  return Joi.validate(req, schema)
}

module.exports = async (req, resp) => {
  // data existance validation
  const { error } = _validateRequestData(req.body)
  if (error) {
    throw new Error(error.details[0].message)
  }
  const username = req.body.username
  const password = req.body.password
  const user = await login(username, password)
  const token = jwt.sign({ id: user._id }, process.env['server.JWTsecret'])
  resp.send(
    { token: 'jwt ' + token }
  )
}
