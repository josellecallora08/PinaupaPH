const { Router } = require('express')
const {
  // checkout,
  createPayment, madePayment,
  createIntent,
  cashPayment,
} = require('../controllers/payment_controller')
const requireAuth = require('../middleware/requireAuth')
const router = Router()

router.patch('/create', requireAuth, createPayment)
router.patch('/invoice', madePayment)
router.post('/create_intent', createIntent)
router.post('/cash_payment', cashPayment)
// router.post('/checkout', checkout)

module.exports = router
