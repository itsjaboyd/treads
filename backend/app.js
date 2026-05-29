const PORT = 3001;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const db = require("./models");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statusRouter = require('./routes/status');

var app = express();

//why they do this?
app.use(cors({
  origin: "http://localhost:3002"
}));

//db.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/status', statusRouter);

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
  //res.render('error');
  res.json({error: "Error returned here!"})
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

module.exports = app;
