var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var zoom = require('./lib');

var app = express();
const port = 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/', async (req, res) => {
  try {
    //zoom.connection('192.83.186.170:210/INNOPAC')
    zoom.connection('z3950.nlai.ir:210')
      .set('preferredRecordSyntax', 'unimarc')
      .query('prefix', '@attr 1=7 ' + '9780073383095')
      .createReadStream()
      .on('data', function (record) {
        res.send(record.json);
        //console.log(record.json, record.xml, record.raw);
      })
      .on('close', function(close) {
        //process.exit(1);
      });
  } catch(e) {
    console.error(e);
    res.send("an error occurred :(");
  }
});

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
  res.render('error');
});

process
  .on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at:", p, "reason:", reason);
    console.error("Unhandled Rejection at:", p, "reason:", reason);
  })
  .on('uncaughtException', err => {
    console.log(err, 'Uncaught Exception thrown');
    console.error(err, 'Uncaught Exception thrown');
  });

app.listen(port, () => {
  console.log(`CliqMind library service listening on port ${port}!`);
});