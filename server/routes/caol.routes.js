const express = require('express');
const router = express.Router();
const controllers = require('../controllers/consultor.controller')

router.get('/api/consultors', controllers.getListConsultors)
router.post('/api/dataconsultors/', controllers.getDataConsultors)

module.exports = router;