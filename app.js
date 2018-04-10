const config = require("./config.json");
global.config = config;

const app = require("./config/server-factory.js");
const router = require("./config/router-config.js");

router(app, config);

app.listen(config.port, () => 
    console.log(`Servidor iniciado \r\n- Porta:${config.port} \r\n- Bat: ${config.batfile}`)
);
