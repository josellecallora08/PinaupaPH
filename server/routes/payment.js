const {Router} = require('express')
const { createIntent } = require('../controllers/payment_controller')

const router = Router()

router.post('/create_intent', createIntent)

module.exports = router