const Router = require('express')
const {
  create_cctv,
  fetch_cctvs,
  fetch_cctv_apartment,
  fetch_cctv,
  update_cctv,
  delete_cctv,
} = require('../controllers/cctv_controller')

const router = Router()

router.get('/', fetch_cctvs)
router.get('/:apartment_id', fetch_cctv_apartment)
router.get('/:apartment_id/:cctv_id', fetch_cctv)
router.post('/:apartment_id', create_cctv)
router.patch('/:apartment_id/:cctv_id', update_cctv)
router.delete('/:apartment_id/delete_cctv/:cctv_id', delete_cctv)

module.exports = router
