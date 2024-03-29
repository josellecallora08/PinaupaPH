const { Router } = require('express')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
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
} = require('../controllers/user_controller')
const multer = require('multer')

const requireAuth = require('../middleware/requireAuth')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.post('/search/:filter', search_user)
router.get('/', fetch_users)
router.get('/:user_id', fetch_user)
router.get('/:user_id/household', fetch_all_household)
router.get('/:user_id/household/:household_id', fetch_household)
router.get('/:user_id/pet', fetch_all_pets)
router.get('/:user_id/pet/:pet_id', fetch_pet)

router.post('/', sign_up)
router.post('/login', sign_in)
router.post('/:user_id/create_household', create_household)
router.post('/:user_id/create_pet', create_pet)

router.patch('/:user_id/display_picture', upload.single('profile_image'), update_profile_picture)
router.patch('/:user_id/update_profile', update_profile)
router.patch('/:user_id/update_household/:household_id', update_household)
router.patch('/:user_id/update_pet/:pet_id', update_pet)

router.delete('/:user_id/delete_tenant', delete_tenant)
router.delete('/:user_id/delete_household/:household_id', delete_household)
router.delete('/:user_id/delete_pet/:pet_id', delete_pet)

module.exports = router
