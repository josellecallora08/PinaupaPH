const { Router } = require('express')
const {
  // checkout,
  createIntent,
  createPaymentMethod,
} = require('../controllers/payment_controller')

const router = Router()

router.post('/create_intent', createIntent)
// router.post('/checkout', checkout)

module.exports = router
