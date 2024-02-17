const Router = require('express')
const {
  create_apartment,
  fetch_apartments,
  fetch_units,
  create_apartment_unit,
  edit_apartment,
  edit_apartment_unit,
  delete_apartment,
  delete_apartment_unit,
} = require('../controllers/apartment_controller')

const router = Router()

router.get('/building', fetch_apartments)
// fetch_apartment
router.get('/:apartment_id/units', fetch_units)
// fetch_unit
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
