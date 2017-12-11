var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var MysqlJson = require('mysql-json');
var index = require('./routes/index');

var _ = require('lodash');

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
  console.log('Connected!\n');
});

// Movie API Query Options
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


function callAPI() {

  // Make sure Rows don't exist when calling the API and insterting
  connection.query("DELETE from movies",
  function(err, response) {
    if (err) throw err;
    console.log('Table cleaned!\n');
  });

  // Get JSON from API
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    //Process the JSON
    var body = JSON.parse(body);
    var body = _.take(body.results, 100);
    var myJSON = JSON.stringify(body);
    var body = _.flatten(body);

    //Iterate through JSON and insert Row to DB
    _.forEach(body, function(item) {
      connection.insert('movies',
      {
          id: item.id,
          adult: item.adult,
          backdrop_path: item.backdrop_path,
          genre_ids: 18,
          original_language: item.original_language,
          original_title: item.original_title,
          overview: item.overview,
          popularity: item.popularity,
          poster_path: item.poster_path,
          release_date: item.release_date,
          title: item.title,
          video: item.video,
          vote_average: item.vote_average,
          vote_count: item.vote_count
      },
        function(err, response) {
         if (err) throw err;
         console.log(body);
       });
    });
  });
}

app.use('/', index);

// Disply page route
app.get('/display', function (req, res) {
  res.sendFile(path.join(__dirname,'../', 'views', 'display.html'));
});

// Gather page route
app.get('/gather', function (req, res, next) {
    callAPI();
    res.send('Getting json file.....');
});

app.get('/data', function(req,res){
  connection.query('SELECT * FROM movies ORDER BY vote_count DESC', (err,rows) => {
    if(err) throw err;
    res.json(rows);
  });
});

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
