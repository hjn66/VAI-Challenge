const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const getUserById = require('../DAO/user/getById')

module.exports = function (passport) {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = process.env['server.JWTsecret']
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      getUserById(jwt_payload.id, (err, user) => {
        if (err) {
          return done(new Error(err), null)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, null)
        }
      })
    })
  )
}
