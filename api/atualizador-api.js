const child_process = require('child_process');

module.exports = function(config){
    return function(req,resp,next){

        child_process.exec(config.batfile, function(error, stdout, stderr) {
            if(error) console.log(error);
            console.log(stdout);
            console.log("vou executar você");
            resp.json({ "teste":"teste"});
            next();
        });
    };

};