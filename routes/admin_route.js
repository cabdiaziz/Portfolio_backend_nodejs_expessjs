const express = require('express');
const adminController = require('../controllers/admin_Controller');
const auth = require('../middlewares/auth')
const router = express.Router();

router.post('/create', adminController.admin_create);

router.post('/login', adminController.admin_login);

router.get('/profile', auth ,adminController.admin_profile);

router.post('/logout', auth ,adminController.logout_accout);

router.post('/logoutAll', auth ,adminController.logout_allaccounts);





module.exports = router;