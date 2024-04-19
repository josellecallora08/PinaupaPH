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

const route = Router()
route.get('/generate', generateInvoice)
route.post('/create', requireAuth, createInvoice)
route.get('/list', requireAuth, fetchInvoices)
route.get('', searchInvoice)
route.get('/fetch', requireAuth, fetchInvoice)
route.delete('/delete',requireAuth, deleteInvoice)
module.exports = route
