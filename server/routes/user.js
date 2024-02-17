const { Router } = require('express')
const {
  fetch_users,
  sign_up,
  sign_in,
  create_household,
  create_pet,
  update_household,
  update_profile,
  update_pet,
  delete_tenant,
  delete_household,
  delete_pet,
  search_user,
} = require('../controllers/user_controller')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.post('/search', search_user)
router.get('/', fetch_users)
//make fetch_users

router.post('/', sign_up)
router.post('/login', sign_in)
router.post('/:user_id/create_household', create_household)
router.post('/:user_id/create_pet', create_pet)

router.patch('/:user_id/update_profile', update_profile)
router.patch('/:user_id/update_household/:household_id', update_household)
router.put('/:user_id/update_pet/:pet_id', update_pet)

router.delete('/:user_id/delete_tenant', delete_tenant)
router.delete('/:user_id/delete_household/:household_id', delete_household)
router.delete('/:user_id/delete_pet/:pet_id', delete_pet)

module.exports = router
