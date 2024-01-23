const Router = require('express')
const { create_cctv, fetch_cctv, update_cctv, delete_cctv } = require('../controllers/cctv_controller')

const router = Router()

router.get('/', fetch_cctv)
router.post('/', create_cctv)
router.patch('/:cctv_id', update_cctv)
router.delete('/:cctv_id', delete_cctv)

module.exports = router