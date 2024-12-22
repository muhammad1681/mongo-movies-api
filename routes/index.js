var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json("Hello, World!");
});

router.get("/get-all-movies", function(res, next){

});

module.exports = router;
