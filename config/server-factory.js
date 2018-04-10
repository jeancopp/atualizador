let winston = require("winston");
let express = require("express");
let bodyParser = require('body-parser');
let fs = require("fs");
let path = require("path");
let morgan = require("morgan");
let expressWinston = require('express-winston');

let arquivo = global.config.log.arquivo;
let logFileStream = fs.createWriteStream(arquivo, {flags: 'a'});

let app = express();


var options = {
    file: {
      level: 'info',
      filename: arquivo,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

expressWinston.requestWhitelist.push('body');
let logger = expressWinston.logger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}} {{req.body}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
};
  


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', {stream: logFileStream}))
app.use(logger)


module.exports = app;