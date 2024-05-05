const Router = require('express')
const {
  fetchNotifications,
  fetchNotification,
  deleteNotification,
} = require('../controllers/notification_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.get('/list', fetchNotifications)
router.get('/list/v1', requireAuth, fetchNotification)
router.delete('/delete', deleteNotification)

module.exports = router
