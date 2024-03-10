const Router = require('express')
const multer = require('multer')
const {
  create_apartment,
  fetch_apartments,
  fetch_units,
  create_apartment_unit,
  edit_apartment,
  edit_apartment_unit,
  delete_apartment,
  delete_apartment_unit,
  fetch_unit,
  fetch_unit_apartment,
  fetch_apartment,
  change_apartment_image,
} = require('../controllers/apartment_controller')

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.get('/building', fetch_apartments)
router.get('/building/:apartment_id', fetch_apartment)
router.post('/building/:apartment_id/:apartment_public_id', upload.single('apartment_image'), change_apartment_image)
router.get('/units', fetch_units)
router.get('/:apartment_id/units', fetch_unit_apartment)
router.get('/:apartment_id/unit/:unit_id', fetch_unit)
router.post('/create_apartment', create_apartment)
router.post('/:apartment_id/create_apartment_unit', create_apartment_unit)
router.patch('/:apartment_id/edit_apartment', edit_apartment)
router.patch('/:apartment_id/edit_apartment_unit/:unit_id', edit_apartment_unit)
router.delete('/:apartment_id', delete_apartment)
router.delete(
  '/:apartment_id/delete_apartment_unit/:unit_id',
  delete_apartment_unit,
)

module.exports = router
