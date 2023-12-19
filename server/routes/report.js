const { Router } = require('express')
const {report, comment} = require('../controllers/report_controller')
const router = Router()

router.post('/:_id', report)
router.post('/comments/:_id', comment)

module.exports = router