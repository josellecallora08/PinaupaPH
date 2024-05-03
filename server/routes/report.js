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

  
router.post('/create',upload.single('attached_image'), createReport)
router.patch('/v1', editReport)
router.delete('/v1', deleteReport)
router.get('/list', fetchReports)
router.get('/list/v1', fetchReport)

router.post('/create/comment', createComment)
router.patch('/update/comment', editComment)
router.delete('/delete/comment', deleteComment)
router.get('/list/comments', fetchComments)
router.get('/list/v1/comments', fetchComment)

router.post('/send-email', sendMail)
module.exports = router
