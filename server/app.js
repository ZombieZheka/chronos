// server/app.js

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require("dotenv");

const dbConnection = require("./database/db");

// dotenv setup
dotenv.config();
// dotenv.config({ debug: true });
const root = path.resolve(__dirname);
process.env.MIDDLEWARES = path.join(root, "middlewares/index.middleware");
process.env.CONTROLLERS = path.join(root, "controllers/index.controller");
process.env.SERVICES = path.join(root, "services/index");
process.env.MODELS = path.join(root, "models/index");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// database setup
dbConnection();

// routes setup
const indexRouter = require('./routes/index.router');
app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
  // res.json({
  //   type: 'error',
  //   message: 'Page not found'
  // });
});

module.exports = app;
