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
// router.get('/gather', function (req, res, next) {
//   res.sendFile(path.join(__dirname,'../', 'views', 'gather.html'));
// });

module.exports = router;
