const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('User Not Found')
  }
  const isMatch = bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Wrong Password')
  }
}
