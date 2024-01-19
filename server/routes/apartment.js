const Router = require('express')
const { create_apartment, fetch_apartment, fetch_apartment_units, create_apartment_unit, edit_apartment, edit_apartment_unit, delete_apartment, delete_apartment_unit } = require('../controllers/apartment_controller')

const router = Router()

router.get('/', fetch_apartment)
router.get('/:apartment_id', fetch_apartment_units)
router.post('/create_apartment', create_apartment)
router.post('/:apartment_id/create_apartment_unit', create_apartment_unit)
router.patch('/:apartment_id/edit_apartment', edit_apartment)
router.patch('/:apartment_id/edit_apartment_unit/:unit_id', edit_apartment_unit)
router.delete('/:apartment_id', delete_apartment)
router.delete('/:apartment_id/delete_apartment_unit/:unit_id', delete_apartment_unit)



module.exports = router