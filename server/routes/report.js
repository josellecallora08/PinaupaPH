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
  searchReport,
  resolveReport,
} = require('../controllers/report_controller')
const { sendMail } = require('../controllers/contact_controller')
const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

  
router.post('/create',upload.array('attached_image', 10), createReport)
router.patch('/update', editReport)
router.patch('/update/v1', resolveReport)
router.delete('/v1', deleteReport)
router.get('/list', fetchReports)
router.get('/list/v1', fetchReport)
router.get('/search', searchReport)

router.post('/create/comment', createComment)
router.patch('/update/comment', editComment)
router.delete('/delete/comment', deleteComment)
router.get('/list/comments', fetchComments)
router.get('/list/v1/comments', fetchComment)

router.post('/send-email', sendMail)
module.exports = router
