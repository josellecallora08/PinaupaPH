const Router = require('express')
const {
  searchContract,
  fetchContracts,
  fetchContract,
  deleteContract,
  editContract,
  createContract,
  generateContract,
} = require('../controllers/document_controller')

const router = Router()
router.post('/create', createContract)
router.get('/generate', generateContract)
router.get('/search', searchContract)
router.get('/list', fetchContracts)
router.get('/list/v1', fetchContract)
router.patch('/update', editContract)
router.delete('/delete', deleteContract)

module.exports = router
