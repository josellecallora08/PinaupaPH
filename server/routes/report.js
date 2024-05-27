const Router = require('express')
const {
  report_deliquency_tenants,
  report_rental_revenue,
  report_goodpayer_tenants,
  fetch_deliquency_tenants,
  fetch_rental_revenue,
  fetch_goodpayer_tenants,
} = require('../controllers/report_controller')

const router = Router()

router.get('/delinquency', report_deliquency_tenants)
router.get('/revenue', report_rental_revenue)
router.get('/goodpayer', report_goodpayer_tenants)
router.get('/delinquency/list', fetch_deliquency_tenants)
router.get('/revenue/list', fetch_rental_revenue)
router.get('/goodpayer/list', fetch_goodpayer_tenants)
module.exports = router
