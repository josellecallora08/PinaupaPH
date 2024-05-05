const Router = require('express')
const {
  totalPaid,
  deliquencyRate,
  occupancyRate,
  reportRate,
} = require('../controllers/dashboard_controller')
const router = Router()

router.get('/totalpaid', totalPaid)
router.get('/deliquency', deliquencyRate)
router.get('/occupancyrate', occupancyRate)
router.get('/reports', reportRate)

module.exports = router
