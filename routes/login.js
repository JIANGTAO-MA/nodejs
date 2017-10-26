var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录',name: '圈子笔记' });
});

module.exports = router;
