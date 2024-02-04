const Router = require('express')
const {
  generate_contract,
  fetch_contract,
  edit_contract,
  remove_contract,
} = require('../controllers/document_controller')

const router = Router()

router.post('/generate_contract', generate_contract)
router.get('/:unit_id/:user_id/fetch_contract', fetch_contract)
router.patch('/:contract_id', edit_contract)
router.delete('/:contract_id', remove_contract)

module.exports = router
