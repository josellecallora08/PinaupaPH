const Router = require('express')
const {
  report_deliquency_tenants,
  report_rental_revenue,
  report_goodpayer_tenants,
} = require('../controllers/report_controller')

const router = Router()

router.get('/deliquency', report_deliquency_tenants)
router.get('/revenue', report_rental_revenue)
router.get('/goodpayer', report_goodpayer_tenants)
module.exports = router


