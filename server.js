//*this is my server
const app = require('./app')
require("dotenv").config();
const env = process.env;
const port = env.PORT;

app.listen(port, () => {
    console.log(`This server is running on port http://localhost:${port}`);
});