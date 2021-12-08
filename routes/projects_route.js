const express = require("express");
const ProjectController = require("../controllers/projects_controller");
const auth = require('../middleware/auth')
const multer = require('multer');

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

router.post("/create", auth, upload.single("image"), ProjectController.project_create);

router.get("/view_all", auth, ProjectController.view_allProjects);

router.get("/view/:id", auth, ProjectController.view_ProjectById);

router.patch("/update/:id", auth, upload.single("image"), ProjectController.project_update);


module.exports = router;