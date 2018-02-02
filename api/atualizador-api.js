const child_process = require('child_process');

const service = function(error, stdout, stderr) {
    if(error) console.log(error);
    console.log(stdout);
    console.log("vou executar você");
    resp.json({ "message":"atualização iniciada"});
    next();
};

module.exports = function(config){
    return function(req,resp,next){
        let parametros = req.params;
        let tok = parametros.token;
        let urlDownload = parametros.body.build ? parametros.body.build.full_url : "";

        if( tok && tok == config.token && urlDownload ){
            child_process.exec(`${config.batfile} ${urlDownload}`, service);
        }else{
            resp.status(405).json({
                "message" : "Token inválido"
            });
        }
    };
};