const {Router} = require('express')
const { checkout, create_intent, payment_method } = require('../controllers/payment_controller')

const router = Router()

router.post('/create_intent/:user_id?', create_intent)
// router.post('/payment_method', payment_method)
router.post('/checkout', checkout)
module.exports = router