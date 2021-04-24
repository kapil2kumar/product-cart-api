const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const { combine, label, timestamp, printf } = format;
const colorizer = format.colorize();
const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
        zippedArchive: true,
        maxSize: '1g',
    }
};


var DailyTransport = new transports.DailyRotateFile({
    filename: path.join(__dirname, 'logs', 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
DailyTransport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
});

// let myFormat
// if (process.env.NODE_ENV === "test") {
//   myFormat = printf(info => ``);
// } else {
//   myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);
// }

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'main' }),
    timestamp(),
    // colorizer,
    myFormat
  ),
  transports: [
    new transports.Console(options),
    // new transports.File({
    //   filename: path.join(__dirname, 'logs', 'application.log'),
    //   options: { flags: 'a', mode: 0o666 }
    // }),
    DailyTransport
  ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};
module.exports = logger;
