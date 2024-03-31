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
const router = Router()

router.post('/:user_id', createReport)
router.patch('/', editReport)
router.delete('/', deleteReport)
router.get('/', fetchReports)
router.get('/v1', fetchReport)
router.post('/:user_id/comment/:report_id', createComment)
router.patch('/:report_id', editComment)
router.delete('/:report_id', deleteComment)
router.get('/:report_id', fetchComments)
router.get('/:report_id/v1', fetchComment)

module.exports = router
