const express = require("express");
const skillsController = require("../controllers/skills_controller");
const auth = require("../middleware/auth");

const router = express.Router();

// router.get('/otherUsersSkills', auth, skillsController.getAllSkills);

router.post("/create", auth, skillsController.skill_create);

router.get("/view_all", auth, skillsController.view_all);

router.get("/view/:id", auth, skillsController.view_byId);

router.patch("/update/:id", auth, skillsController.skill_update);

module.exports = router;