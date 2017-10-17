/**
 * Created by majiangtao on 2017/9/21.
 */
var mysql = require('../db/mysql');
var NODE_TABLE = 'users';

/**
 * 用户登录
 * @param id
 * @param callback
 */
var fn_userLogin = function (username,password,callback) {
    var promise = new Promise(function (resolve, reject) {
        mysql.connection.query(
            'SELECT * FROM '+NODE_TABLE+' where username = "' + username + '" and password = "'+password+'"',
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if(results)
                {
                    resolve(results);
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].password);
                    }
                }
            }
        );
    });

    promise.then(function (value) {
        //成功
        if(value.length == 1){
            callback(true);
            return true;
        }
        callback(false);
        return false;
    }, function (value) {
        //失败
        callback('登录失败');
        console.log('登录失败');
    });

};

/***
 * 查询用户
 * @param id
 * @param callback
 */
var fn_getUser = function (id,callback) {
    var promise = new Promise(function (resolve, reject) {
        mysql.connection.query(
            'SELECT * FROM '+NODE_TABLE+' where id = '+id,
            function selectCb(err, results, fields) {
                if (err) {
                    throw err;
                }
                if(results)
                {
                    resolve(results);
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].password);
                    }
                }
            }
        );
    });

    promise.then(function (value) {
        //成功
        var rs = {root:[],success:true};
        for(var i=0;i<value.length;i++){
            rs.root.push(value[i].id,value[i].username)
        }
        callback(rs);
        return rs;
    }, function (value) {
        //失败
        callback('查询失败');
        console.log('查询失败');
    });

};

/***
 * 添加用户
 * @param param
 * @param callback
 */
var fn_addUser = function (param,callback) {
    mysql.connection.query(
        'insert INTO '+NODE_TABLE+'(username,password) VALUES(?,?)',
        param,
        function (err, results, fields) {
            if(err)
                throw err;

            if(results){
                callback(results);
                console.log('添加成功',results)
            }
        }
    );

};

/***
 * 删除用户
 * @param id
 * @param callback
 */
var fn_delUser = function (id, callback) {
    mysql.connection.query(
        'delete from '+NODE_TABLE+' where id = '+id,
        function (err,results) {
            if(err){
                throw err;
            }
            callback(results);
        }
    )
};

module.exports = {
    login:fn_userLogin,
    getUser:fn_getUser,
    addUser: fn_addUser,
    delUser:fn_delUser
};
