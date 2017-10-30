var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录',description: '用圈子笔记记录你的知识、经验和见解' });
});

module.exports = router;
