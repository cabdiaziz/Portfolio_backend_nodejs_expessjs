const express = require("express");
const morgan = require("morgan");

const adminRoutes = require("./routes/admin_route");
const SkillRouter = require("./routes/SkillRoute");
const ProjectController = require("./routes/ProjectRoute");
require("./config/db");

require("dotenv").config(); //env process.env.instance-variable.
const env = process.env; // this allow us to don't write process.env everytime.
const port = env.PORT || 2000; // asign our server port.
const app = express();

app.use(express.json());
app.use(morgan("tiny")); // called morgan.

//my API'S from router folder
app.use("/api/skills", SkillRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", ProjectController);

app.listen(port, () => {
  console.log(`This server is running on port http://localhost:${port}`);
});
