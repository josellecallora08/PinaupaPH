const Router = require('express')
const {
  totalPaid,
  deliquencyRate,
  occupancyRate,
  reportRate,
  revenueDashboard,
  overPayments,
} = require('../controllers/dashboard_controller')
const router = Router()

router.get('/totalpaid', totalPaid)
router.get('/deliquency', deliquencyRate)
router.get('/occupancyrate', occupancyRate)
router.get('/reports', reportRate)
router.get('/chart', revenueDashboard)
router.get('/overpayment', overPayments)

module.exports = router
