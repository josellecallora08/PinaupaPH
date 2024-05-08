const { Router } = require('express')
const {
  // checkout,
  createPayment, madePayment,
} = require('../controllers/payment_controller')
const requireAuth = require('../middleware/requireAuth')
const router = Router()

router.post('/create', requireAuth, createPayment)
router.patch('/payment', madePayment)
// router.post('/checkout', checkout)

module.exports = router
