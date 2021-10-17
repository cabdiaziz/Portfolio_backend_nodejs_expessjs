const fs = require("fs");
const { ProjectModel, validation } = require("../models/ProjectModel");

const getProjects = async (req, res) => {
  const projects = await ProjectModel.find().sort({ name: 1 });

  res.send(projects);
};

const getProjectById = async (req, res) => {
  try {
    const getProject = await ProjectModel.findById(req.params.id);
    if (!getProject)
      return res.status(404).send("The project with Given ID was not found");

    res.send(getProject);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const postProject = async (req, res) => {
  const image = req.file ? req.file.path : "uploads\\default.png";

  const newData = { ...req.body, image };
  const { error } = validation(newData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const project = new ProjectModel(newData);
    const result = await project.save();
    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

const updateProject = async (req, res) => {
  const image = req.file ? req.file.path : "uploads\\default.png";

  const newData = { ...req.body, image };
  const { error } = validation(newData);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const getProject = await ProjectModel.findById(req.params.id);
    if (!getProject)
      return res.status(404).send("The Skill with Given ID was not found");

    if (getProject.image !== "uploads\\default.png") {
      fs.unlink(getProject.image, function (err) {
        if (err) return console.log(err);

        // if no error, file has been deleted successfully
        console.log("File deleted!");
      });
    }

    const result = await ProjectModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: newData,
      },
      {
        new: true,
      }
    );

    res.send(result);
  } catch (ex) {
    for (feild in ex.errors) res.status(400).json(ex.errors[feild].message);
  }
};

module.exports = {
  getProjects,
  postProject,
  updateProject,
  getProjectById,
};
