const addUser = require('../DAO/user/uspsert')

module.exports = async () => {
  const user = {}
  user.firstName = process.env['admin.firstName']
  user.lastName = process.env['admin.lastName']
  user.username = process.env['admin.username']
  user.password = process.env['admin.password']

  await addUser(user)
}
