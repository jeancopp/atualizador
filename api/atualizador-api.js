const child_process = require('child_process');
const service = (err, s, se) => console.log(err ? se : `Saída da execução: ${s}`);

module.exports = function(config){
    return function(req,resp,next){
        let parametros = req.params;
        let tok = parametros.token;

        let urlDownload = req.body.build ? req.body.build.full_url : "";
        
        if( tok && tok == config.token && urlDownload ){
            child_process.exec(`${config.batfile} ${urlDownload}`, service);
            resp.json({ "message":"Atualização iniciada"});
            next();
        }else{
            resp.status(405).json({
                "message" : !tok || tok != config.token ? 
                                `Token(${tok}) inválido` : 
                                    `URL de download está em branco`
            });
        }
    };
};