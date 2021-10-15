const { getSkill } = require("../controllers/SkillController");
const express = require("express");

const router = express.Router();

router.get("/", getSkill);

module.exports = router;
