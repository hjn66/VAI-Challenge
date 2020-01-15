
const User = require('../../models/user')

module.exports = (id, callback) => {
  User.findById(id).then(user => {
    if (!user) {
      return callback(new Error('User Not Found'), null)
    }
    return callback(null, user)
  })
}
