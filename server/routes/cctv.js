const Router = require('express')
const {
  create_cctv,
  fetch_cctvs,
  update_cctv,
  delete_cctv,
} = require('../controllers/cctv_controller')

const router = Router()

router.get('/', fetch_cctvs)
router.post('/:apartment_id', create_cctv)
router.patch('/:cctv_id', update_cctv)
router.delete('/:apartment_id/delete_cctv/:cctv_id', delete_cctv)

module.exports = router
