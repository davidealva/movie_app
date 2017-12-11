var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

// Disply page route
router.get('/display', function (req, res) {
  res.sendFile(path.join(__dirname,'../', 'views', 'display.html'));
});

// // Gather page route
// router.get('/gather', function (req, res) {
//   callAPI();
//   res.send("Insterting JSON from API.....All done!");
// });
//
router.get('/data', function(req,res){
  mysqlJson.query('SELECT * FROM data', (err,rows) => {
    if(err) throw err;
    res.json(rows);
  });
});


module.exports = router;
