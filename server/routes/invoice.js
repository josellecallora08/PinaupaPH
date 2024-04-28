const Router = require('express')
const {
  createInvoice,
  fetchInvoices,
  fetchInvoice,
  deleteInvoice,
  searchInvoice,
  generateInvoice,
  editInvoice,
} = require('../controllers/invoice_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()
router.get('/generate', generateInvoice)
router.post('/create', createInvoice)
router.get('/list', requireAuth, fetchInvoices)
router.get('/search', searchInvoice)
router.get('/list/v1', fetchInvoice)
router.delete('/delete',requireAuth, deleteInvoice)
router.patch('/update',  editInvoice)
module.exports = router
