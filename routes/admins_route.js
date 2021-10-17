const express = require('express');
const adminController = require('../controllers/admins_controller');
const auth = require('../middleware/auth')
const router = express.Router();

router.post('/create', adminController.admin_create);

router.post('/login', adminController.admin_login);

router.get('/myProfile', auth ,adminController.admin_profile);

router.post('/logout', auth ,adminController.logout_accout);

router.post('/logoutAll', auth ,adminController.logout_allaccounts);

router.delete('/del_myProfile', auth, adminController.delete_myProfile);

router.patch('/update_myProfile', auth, adminController.update_myProfile)



module.exports = router;