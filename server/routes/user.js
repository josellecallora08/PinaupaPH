const { Router } = require('express')
const {sign_up, sign_in, update_profile, create_cctv, create_household, create_pet, update_cctv, update_household} = require('../controllers/user_controller')

const router = Router()

router.post('/', sign_up)
router.get('/', sign_in)
router.post('/:user_id/create_cctv', create_cctv)
router.post('/:user_id/create_household', create_household)
router.post('/:user_id/create_pet', create_pet)
router.put('/:user_id/update_profile', update_profile)
router.put('/:user_id/update_cctv/:cctv_id', update_cctv)
router.put('/:user_id/update_household/:household_id', update_household)

module.exports = router