const { Router } = require('express')
const {
  // checkout,
  createPayment, madePayment,
  createIntent,
} = require('../controllers/payment_controller')
const requireAuth = require('../middleware/requireAuth')
const router = Router()

router.post('/create', requireAuth, createPayment)
router.patch('/invoice', madePayment)
router.post('/create_intent', createIntent)
// router.post('/checkout', checkout)

module.exports = router
