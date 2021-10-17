const express = require("express");

const ProjectController = require("../controllers/projects_controller");

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

router.get("/", ProjectController.getProjects);
router.post("/", upload.single("image"), ProjectController.postProject);
router.put("/:id", upload.single("image"), ProjectController.updateProject);
router.get("/:id", ProjectController.getProjectById);

module.exports = router;
