const Router = require('express')
const { generate_contract, fetch_contract } = require('../controllers/document_controller')

const router = Router()

router.post('/:unit_id/:user_id/generate_contract', generate_contract)
router.get('/:unit_id/:user_id/fetch_contract', fetch_contract)

module.exports = router