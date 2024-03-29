const Router = require('express')
const {
  generate_contract,
  generate_pdf,
  edit_contract,
  remove_contract,
} = require('../controllers/document_controller')

const router = Router()

router.post('/:unit_id/:user_id/generate_contract/', generate_contract)
router.get('/:unit_id/:user_id/fetch_contract', generate_pdf)
router.patch('/:contract_id', edit_contract)
router.delete('/:contract_id', remove_contract)

module.exports = router
