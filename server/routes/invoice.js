const Router = require('express')
const {
  createInvoice,
  fetchInvoices,
  fetchInvoice,
  deleteInvoice,
  searchInvoice,
  generateInvoice,
} = require('../controllers/invoice_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()
router.get('/generate', generateInvoice)
router.post('/create', requireAuth, createInvoice)
router.get('/list', requireAuth, fetchInvoices)
router.get('/search', searchInvoice)
router.get('/fetch', requireAuth, fetchInvoice)
router.delete('/delete',requireAuth, deleteInvoice)
module.exports = router
