const Router = require('express')
const {
  createInvoice,
  fetchInvoices,
  fetchInvoice,
  deleteInvoice,
} = require('../controllers/invoice_controller')
const requireAuth = require('../middleware/requireAuth')

const route = Router()
route.post('/create', requireAuth, createInvoice)
route.get('/list', requireAuth, fetchInvoices)
route.get('/fetch', requireAuth, fetchInvoice)
route.delete('/delete',requireAuth, deleteInvoice)
module.exports = route
