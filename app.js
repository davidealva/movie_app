var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var MysqlJson = require('mysql-json');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
var connection = new MysqlJson({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database: 'candidate_alvaradod'
});

// Check connection
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});


var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs:
   {
     primary_release_year: '2015',
     genres: 18,
     'certification.lte': 'r',
     include_video: 'false',
     include_adult: 'false',
     sort_by: 'popularity.desc',
     api_key: 'b7766f055f7482d017a2fbf7f1603ca3' },
     page: '1',
     page: '2',
     page: '3',
     page: '4',
     page: '5',
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
