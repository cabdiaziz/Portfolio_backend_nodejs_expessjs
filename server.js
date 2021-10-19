const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("express-async-errors");

const adminRoute = require('./routes/admins_route');
const skillRoute = require('./routes/skills_route');
const projectRoute = require('./routes/projects_route')
const educationRoute = require('./routes/educations_route')

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
app.use('/api/admin', adminRoute);
app.use('/api/skill', skillRoute);
app.use('/api/project', projectRoute);
app.use('/api/education', educationRoute);


app.listen(port, () => {
  console.log(`This server is running on port http://localhost:${port}`);
});