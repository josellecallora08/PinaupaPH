const { Router } = require('express')
const cloudinary = require('cloudinary').v2
const {
  create_household,
  update_household,
  delete_household,
  fetch_all_household,
  fetch_household,
} = require('../controllers/household_controller')

const {
  create_pet,
  update_pet,
  delete_pet,
  fetch_all_pets,
  fetch_pet,
} = require('../controllers/pet_controller')

const {
  fetch_users,
  fetch_user,
  sign_up,
  sign_in,
  update_profile,
  search_user,
  update_profile_picture,
  update_unit_info,
  forgot_password,
  check_otp,
  fetch_data,
  reset_password,
  fetch_otp,
  createAdminAccount,
  deleteTenant,
  forcedDeleteTenant,
  restoreAccount,
} = require('../controllers/user_controller')
const multer = require('multer')

const requireAuth = require('../middleware/requireAuth')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/create/superadmin',requireAuth, createAdminAccount)
router.post('/forgot-password', forgot_password)
router.post('/otp', check_otp)
router.post('/reset-password/user', reset_password)
router.get('/otp-alive', fetch_otp)
router.post('/search', requireAuth, search_user)
router.get('/tenants', requireAuth, fetch_users)
router.get('/', requireAuth, fetch_data)
router.get('/tenant', requireAuth, fetch_user)
router.get('/:user_id/household', requireAuth, fetch_all_household)
router.get('/:user_id/household/v1', requireAuth, fetch_household)
router.get('/:user_id/fetch/pets', requireAuth, fetch_all_pets)
router.get('/:user_id/fetch/pet/v1', requireAuth, fetch_pet)

router.post('/', requireAuth, sign_up)
router.post('/login', sign_in)
router.post('/:user_id/create_household', requireAuth, create_household)
router.post('/:user_id/create_pet', requireAuth, create_pet)

router.patch(
  '/profile',
  upload.single('profile_image'),
  requireAuth,
  update_profile_picture,
)

router.patch('/account/delete', requireAuth, deleteTenant)
router.patch('/account/recover', requireAuth, restoreAccount)
router.patch('/account/update', requireAuth, update_profile)
router.patch('/:user_id/update_household', requireAuth, update_household)
router.patch('/:user_id/update_pet', requireAuth, update_pet)
router.patch(
  '/apartment/unit/update',
  requireAuth,
  update_unit_info,
)
router.delete('/delete_tenant', requireAuth, forcedDeleteTenant)
router.delete('/:user_id/delete_household', requireAuth, delete_household)
router.delete('/:user_id/delete_pet', requireAuth, delete_pet)

module.exports = router
