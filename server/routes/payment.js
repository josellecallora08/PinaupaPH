const { Router } = require('express')
const {
  // checkout,
  createPayment,
} = require('../controllers/payment_controller')

const router = Router()

router.post('/create', createPayment)
// router.post('/checkout', checkout)

module.exports = router
