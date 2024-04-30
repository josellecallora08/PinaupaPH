const Router = require('express')
const { fetchNotifications, fetchNotification, deleteNotification } = require('../controllers/notification_controller')

const router = Router()

router.get('/list', fetchNotifications)
router.get('/list/v1', fetchNotification)
router.delete('/delete', deleteNotification)

module.exports = router