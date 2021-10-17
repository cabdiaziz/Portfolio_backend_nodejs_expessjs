const express = require("express");

const {
  getProjects,
  postProject,
  updateProject,
  getProjectById,
} = require("../controllers/ProjectController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const newFileName = file.originalname.split(".")[0];
    const fileType = file.mimetype.split("/")[1];
    cb(null, newFileName + new Date().getTime() + "." + fileType);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), postProject);
router.put("/:id", upload.single("image"), updateProject);
router.get("/:id", getProjectById);

module.exports = router;
