const { Router } = require('express')
const {sign_up, sign_in, update_profile, create_cctv, create_household, create_pet} = require('../controllers/user_controller')

const router = Router()

router.post('/', sign_up)
router.get('/', sign_in)
router.put('/update_profile/:_id', update_profile)
router.post('/create_cctv/:_id', create_cctv)
router.post('/create_household', create_household)
router.post('/create_pet', create_pet)

module.exports = router