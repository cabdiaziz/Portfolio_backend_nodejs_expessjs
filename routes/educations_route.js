const express = require('express');
const educationController = require('../controllers/educations_controller');
const auth = require('../middleware/auth')
const router = express.Router();



router.post('/create', auth, educationController.education_create);

router.get('/view_all', auth, educationController.view_allEducation);

router.get('/view/:id', auth, educationController.view_EducationById);

router.put('/update/:id', auth, educationController.education_update);

module.exports = router;