//*this is my App.

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const userRoute = require("./routes/user_route");
const skillRoute = require("./routes/skills_route");
const projectRoute = require("./routes/projects_route");
const educationRoute = require("./routes/educations_route");

require("./config/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cookieParser());

//my API'S from router folder
app.use("/api/user", userRoute);
app.use("/api/skill", skillRoute);
app.use("/api/project", projectRoute);
app.use("/api/education", educationRoute);

module.exports = app;