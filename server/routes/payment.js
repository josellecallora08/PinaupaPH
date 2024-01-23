const {Router} = require('express')
const { checkout } = require('../controllers/payment_controller')

const router = Router()

router.post('/checkout', checkout)
module.exports = router