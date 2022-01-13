//*this is my server
const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`This server is running on port http://localhost:${port}`);
});