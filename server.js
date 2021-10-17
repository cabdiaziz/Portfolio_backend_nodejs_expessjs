const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const adminRoutes = require("./routes/admin_route");
const SkillRouter = require("./routes/SkillRoute");
const ProjectController = require("./routes/ProjectRoute");
require("./config/db");

require("./config/db");

require("dotenv").config();
const env = process.env;
const port = env.PORT || 2000;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser());

//my API'S from router folder
app.use("/api/skills", SkillRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", ProjectController);

app.listen(port, () => {
  console.log(`This server is running on port http://localhost:${port}`);
});
