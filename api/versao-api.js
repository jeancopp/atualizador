
module.exports = function(config){
    return function(req, resp, next){
        console.log(req.params);
        resp.json({ "teste":"teste"});
        next();
    };
};
