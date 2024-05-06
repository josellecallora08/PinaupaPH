const Router = require('express')
const {
  createAnnouncement,
  fetchAnnouncements,
  fetchAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  recentAnnouncement,
  searchAnnouncement,
} = require('../controllers/announcement_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.post('/', requireAuth, createAnnouncement)
router.get('/list', fetchAnnouncements)
router.get('/list/v1', fetchAnnouncement)
router.get('/recent', recentAnnouncement)
router.get('/search', searchAnnouncement)
router.patch('/edit', editAnnouncement)
router.delete('/delete', deleteAnnouncement)

module.exports = router
