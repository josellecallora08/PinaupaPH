const { Router } = require('express')
const {
  createReport,
  createComment,
  editReport,
  deleteReport,
  fetchReports,
  fetchReport,
  editComment,
  deleteComment,
  fetchComments,
  fetchComment,
} = require('../controllers/report_controller')
const { sendMail } = require('../controllers/contact_controller')
const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

  
router.post('/:user_id',upload.single('attached_image'), createReport)
router.patch('/v1', editReport)
router.delete('/v1', deleteReport)
router.get('/', fetchReports)
router.get('/v1', fetchReport)

router.post('/comments/v1', createComment)
router.patch('/', editComment)
router.delete('/', deleteComment)
router.get('/v1', fetchComments)
router.get('/', fetchComment)

router.post('/send-email', sendMail)
module.exports = router
