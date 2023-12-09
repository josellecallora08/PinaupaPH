const { Router } = require('express')
const {signup, signin} = require('../controllers/user_controller')

const router = Router()

router.post('/', signup)
router.get('/', signin)

module.exports = router