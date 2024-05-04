const Router = require('express')
const {
  createInvoice,
  fetchInvoices,
  fetchInvoice,
  deleteInvoice,
  searchInvoice,
  generateInvoice,
  editInvoice,
  tenantInvoice,
} = require('../controllers/invoice_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()
router.get('/generate', generateInvoice)
router.post('/create', createInvoice)
router.get('/', requireAuth, tenantInvoice)
router.get('/list', fetchInvoices)
router.get('/search', searchInvoice)
router.get('/list/v1', fetchInvoice)
router.delete('/delete',requireAuth, deleteInvoice)
router.patch('/update',  editInvoice)
module.exports = router
