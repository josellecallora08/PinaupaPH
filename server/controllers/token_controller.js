const TOKENMODEL = require('../models/token')
const httpStatusCodes = require('../constants/constants')
const jwt = require('jsonwebtoken')
const createToken = (id, username, role) => {
  return jwt.sign({ id, username, role }, process.env.SECRET)
}

module.exports.verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'User unauthorized to do the action.' })

    const token = authorization.replace(`Bearer `, '')
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const response = await TOKENMODEL.findOne({
      user_id: decodedToken.id,
      token: token,
    })
    if (!response)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Token not found..' })

    const newToken = createToken(
      decodedToken.id,
      decodedToken.username,
      decodedToken.role,
    )
    const generatedToken = await TOKENMODEL.findByIdAndUpdate(
      response._id,
      {
        token: newToken,
      },
      { new: true },
    )
    if (!generatedToken)
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Token not created' })

    req.user = decodedToken
    req.newToken = generatedToken.token
    next()
  } catch (err) {
    console.log(err.message)
    return res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}
