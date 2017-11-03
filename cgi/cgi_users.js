/**
 * Created by majiangtao on 2017/9/21.
 */
var mysql = require('../db/mysql');
var NODE_TABLE = 'users';

module.exports = {
    /**
     * 用户登录
     * @param id
     * @param callback
     */
    login:function (username,password,callback) {
        var json = {success:false};
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
                json.success = true;
                json.user = value;
                callback(json);
                return;
            }
            json.errMessage = '用户不存在';
            callback(json);
        }, function (value) {
            //失败
            json.errMessage = '登录失败';
            callback(json);
        });

    },

    /***
     * 查询用户
     * @param id
     * @param callback
     */
    getUser:function (id,callback) {
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

    },

    /***
     * 添加用户
     * @param param
     * @param callback
     */
    addUser: function (param,callback) {
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

    },

    /***
     * 删除用户
     * @param id
     * @param callback
     */
    delUser:function (id, callback) {
        mysql.connection.query(
            'delete from '+NODE_TABLE+' where id = '+id,
            function (err,results) {
                if(err){
                    throw err;
                }
                callback(results);
            }
        )
    }
};
