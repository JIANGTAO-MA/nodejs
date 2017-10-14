/**
 * Created by majiangtao on 2017/9/23.
 */
var express = require('express');
var router = express.Router();

var cgi_users = require('./cgi_users');

/**
 * 用户登录
 */
router.get('/user/login', function(req, res, next) {
    res.send('respond with a resource');
    cgi_users.getUser(2, function (rs) {

    });
});

module.exports = router;