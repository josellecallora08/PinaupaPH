const Router = require('express')
const {
  searchContract,
  fetchContracts,
  fetchContract,
  deleteContract,
  editContract,
  createContract,
  generatePdf,
} = require('../controllers/document_controller')

const router = Router()

router.post('/generate_contract', createContract)
router.get('/fetch_contract', generatePdf)
router.get('/search', searchContract)
router.get('/list', fetchContracts)
router.get('/list/v1', fetchContract)
router.patch('/edit', editContract)
router.delete('/delete', deleteContract)

module.exports = router
