const express = require('express');
const adminController = require('../controllers/admin_Controller');
const router = express.Router();
//@GET dashboard API
router.get('/', adminController.dashboard);

router.post('/create', adminController.admin_create);

router.post('/login', adminController.admin_login);



module.exports = router;