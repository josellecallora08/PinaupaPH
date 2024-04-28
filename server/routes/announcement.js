const Router = require('express')
const {
  createAnnouncement,
  fetchAnnouncements,
  fetchAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcement_controller')

const router = Router()

router.post('/', createAnnouncement)
router.get('/list', fetchAnnouncements)
router.get('/list/v1', fetchAnnouncement)
router.patch('/edit', editAnnouncement)
router.delete('/delete', deleteAnnouncement)

module.exports = router
