const { Router } = require('express')
const { sign_up, sign_in, 
        create_cctv, create_household, create_pet, 
        update_cctv, update_household, update_profile, update_pet,
        delete_tenant, delete_cctv, delete_household, delete_pet
    } = require('../controllers/user_controller')

const router = Router()

router.post('/', sign_up)
router.get('/', sign_in)
router.post('/:user_id/create_cctv', create_cctv)
router.post('/:user_id/create_household', create_household)
router.post('/:user_id/create_pet', create_pet)

router.put('/:user_id/update_profile', update_profile)
router.put('/:user_id/update_cctv/:cctv_id', update_cctv)
router.put('/:user_id/update_household/:household_id', update_household)
router.put('/:user_id/update_pet/:pet_id', update_pet)

router.delete('/delete_tenant/:user_id', delete_tenant)
router.delete('/:user_id/delete_cctv/:cctv_id', delete_cctv)
router.delete('/:user_id/delete_household/:household_id', delete_household)
router.delete('/:user_id/delete_pet/:pet_id', delete_pet)






module.exports = router