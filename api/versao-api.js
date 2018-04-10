
module.exports = function(config){
    return function(req, resp, next){
        let retorno = require("../config.json").retorno;
        resp.json(retorno);
        next();
    };
};
