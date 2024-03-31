const jwt = require('jsonwebtoken')
const httpStatusCodes = require('../constants/constants')

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization)
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ error: 'Token not found...' })

    const token = authorization.replace(`Bearer `, '')
    const decodedToken = jwt.verify(token, process.env.SECRET)

    req.user = decodedToken
    next()
  } catch (err) {
    console.log(`Unable to proceed from middleware`)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

module.exports = requireAuth
