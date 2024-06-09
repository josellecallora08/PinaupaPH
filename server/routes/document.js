const Router = require('express')
const {
  searchContract,
  fetchContracts,
  fetchContract,
  deleteContract,
  editContract,
  createContract,
  generateContract,
  uploadRequirements,
  fetchRequirements,
} = require('../controllers/document_controller')

const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
router.post('/create', createContract)
router.get('/generate', generateContract)
router.get('/search', searchContract)
router.get('/list', fetchContracts)
router.get('/list/v1', fetchContract)
router.patch('/update', editContract)
router.delete('/delete', deleteContract)
router.post('/documents', upload.array('requirements'), uploadRequirements)
router.get('/documents/list', fetchRequirements)

module.exports = router
