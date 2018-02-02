module.exports = function(app, config){

    /**
     * Api que irá chamar o bat de atualização
     */
    app.post("/atualizar/:token",require(config.api.atualizador)(config));
    
    /**
     * Api que irá retornar a versão da última atualizada
     */
    app.get("/atualizar/:token",require(config.api.versao)(config));
}



