const Router = require('express')
const multer = require('multer')
const {
  create_apartment,
  fetch_apartments,
  edit_apartment,
  delete_apartment,
  fetch_apartment,
  change_apartment_image,
  search_apartment,
} = require('../controllers/apartment_controller')
const {
  fetch_unit_apartment,
  fetch_units,
  delete_apartment_unit,
  edit_apartment_unit,
  create_apartment_unit,
  fetch_unit,
  fetch_previous_tenants,
  generate_previous_tenants,
} = require('../controllers/unit_controller')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

//Apartments
router.post('/search', search_apartment)
router.get('/building/list', fetch_apartments)
router.get('/building/list/v1', fetch_apartment)
router.post(
  '/building/:apartment_id/:apartment_public_id',
  upload.single('apartment_image'),
  change_apartment_image,
)

router.post('/create_apartment', create_apartment)
router.patch('/update', edit_apartment)
router.delete('/:apartment_id', delete_apartment)

//Units
router.post('/:apartment_id/create_apartment_unit', create_apartment_unit)
router.get('/:apartment_id/unit/:unit_id', fetch_unit)
router.get('/units', fetch_units)
router.get('/:apartment_id/units', fetch_unit_apartment)
router.patch('/:apartment_id/edit_apartment_unit/:unit_id', edit_apartment_unit)
router.delete('/:apartment_id/delete_apartment_unit', delete_apartment_unit)
router.get('/unit/previoustenants', generate_previous_tenants)
router.get('/unit/previoustenants/list', fetch_previous_tenants)

module.exports = router
