const config = require("./config.json");


const app = require("./config/server-factory.js");
const router = require("./config/router-config.js");

router(app, config);


app.listen(config.port, () => console.log("Servidor iniciado"));