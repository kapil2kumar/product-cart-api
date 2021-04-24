const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const bodyParser = require('body-parser');
// const winstonLogger = require('./logger');
const {sendResponse} = require('./helpers/general');

const app = express();
// winstonLogger.info("Node APP");
// view engine setup
app.set('view engine', 'jade');

if (process.env.NODE_ENV !="test") {
  require('./connection')  
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use(function (err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
        let errorMessage = "";
        try {
          errorMessage = `${err.validations.body[0].property} ${err.validations.body[0].messages.join(", ")}`
        } catch (error) {
          errorMessage = err.validations.body;
        }
        var responseData = {
            status: false,
            msg: 'Bad Request',
            data: null,
            error: errorMessage,
            code:400
        };
        return sendResponse(res,responseData);
    } else {
      console.log(err);
      var errorData = {
          status: false,
          msg: err.message,
          data: null,
          error: err,
          code:500
      };
      return sendResponse(res,errorData);
    }
});

const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
    info: {
        description: 'product-cart-api',
        title: 'Swagger',
        version: '1.0.0',
    },
    host: 'localhost:8000',
    basePath: '',
    produces: ["application/json"],
    schemes: ['http'],
    securityDefinitions: {
      JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/users.js','./routes/products.js'] //Path to the API handle folder
};
expressSwagger(options);

module.exports = app;
