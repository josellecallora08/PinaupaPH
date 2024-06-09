const { Router } = require('express')
const {
  createConcern,
  createComment,
  editConcern,
  deleteConcern,
  fetchConcerns,
  fetchConcern,
  editComment,
  deleteComment,
  fetchComments,
  fetchComment,
  searchConcern,
  resolveConcern,
} = require('../controllers/concern_controller')
const { sendMail } = require('../controllers/contact_controller')
const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })


router.post('/create', upload.array('attached_image', 10), createConcern)
router.patch('/update', editConcern)
router.patch('/update/v1', resolveConcern)
router.delete('/v1', deleteConcern)
router.get('/list', fetchConcerns)
router.get('/list/v1', fetchConcern)
router.get('/search', searchConcern)

router.post('/create/comment', createComment)
router.patch('/update/comment', editComment)
router.delete('/delete/comment', deleteComment)
router.get('/list/comments', fetchComments)
router.get('/list/v1/comments', fetchComment)

router.post('/send-email', sendMail)
module.exports = router
