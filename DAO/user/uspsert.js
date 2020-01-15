const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = async newUser => {
  const result = await User.findOne({ username: newUser.username })
  if (!result) {
    const user = new User(newUser)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newUser.password, salt)
    user.password = hash
    return user.save()
  }
}
