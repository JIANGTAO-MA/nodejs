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
    cgi_users.login(req.query.username,req.query.password, function (rs) {
        if(rs){
            res.render('users', { title: '工作台' });
        }
    });
});

/**
 * 查询用户
 */
router.get('/user/get', function(req, res, next) {
    cgi_users.getUser(req.query.id, function (rs) {
        res.send(JSON.stringify(rs));
    });
});

module.exports = router;