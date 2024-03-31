const { Router } = require('express')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
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
  delete_tenant,
  search_user,
  update_profile_picture,
  update_unit_info,
} = require('../controllers/user_controller')
const multer = require('multer')

const requireAuth = require('../middleware/requireAuth')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/search', requireAuth, search_user)
router.get('/', requireAuth, fetch_users)
router.get('/:user_id', requireAuth, fetch_user)
router.get('/:user_id/household', fetch_all_household)
router.get('/:user_id/household/:household_id', fetch_household)
router.get('/fetch/pets', requireAuth, fetch_all_pets)
router.get('/fetch/pet/v1', requireAuth, fetch_pet)

router.post('/', requireAuth, sign_up)
router.post('/login', sign_in)
router.post('/:user_id/create_household', create_household)
router.post('/create_pet', requireAuth, create_pet)

router.patch(
  '/display_picture',
  upload.single('profile_image'),
  requireAuth,
  update_profile_picture,
)
router.patch('/:user_id/update_profile', requireAuth, update_profile)
router.patch('/:user_id/update_household/:household_id', update_household)
router.patch('/update_pet/:pet_id', requireAuth, update_pet)
router.patch(
  '/:user_id/update-apartment-details',
  requireAuth,
  update_unit_info,
)
router.delete('/delete_tenant', requireAuth, delete_tenant)
router.delete('/:user_id/delete_household/:household_id', delete_household)
router.delete('/delete_pet/:pet_id', requireAuth, delete_pet)

module.exports = router
