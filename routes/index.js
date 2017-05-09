var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('index.html');
});

router.get("/game.html",function(req,res)
{
  res.status(200).render("game.html");
});

module.exports = router;
