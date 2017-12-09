var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getuserlist',function(req,res){
  var tmp=[];
  express.list_user.forEach(elem => {
    // body...
    tmp.push(elem.name);
  });
  res.send(tmp);
})
module.exports = router;
