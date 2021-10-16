const express = require("express");
const {
  getSkills,
  postSkill,
  updateSkill,
  getSkillById,
} = require("../controllers/SkillController");

const router = express.Router();

router.get("/", getSkills);
router.post("/", postSkill);
router.put("/:id", updateSkill);
router.get("/:id", getSkillById);

module.exports = router;
