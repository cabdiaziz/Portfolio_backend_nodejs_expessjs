const express = require('express');
const adminController = require('../controllers/admin_Controller');
const router = express.Router();
//@GET dashboard API
router.get('/', adminController.dashboard);


module.exports = router;