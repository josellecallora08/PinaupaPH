const jwt = require('jsonwebtoken')
const httpStatusCodes = require('../constants/constants')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ error: 'Unauthorized action' })
  }
  try {
    const token = authorization.replace('Bearer ', '')
    const decode_token = jwt.verify(token, process.env.SECRET)

    req.user = decode_token
    next()
  } catch (err) {
    console.error({ error: err.message })
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Server Error...' })
  }
}

module.exports = requireAuth
