/**
 * Created by majiangtao on 2017/9/21.
 */
var conn = require('../db/mysql');
var NODE_TABLE = 'users';

/***
 * 查询用户
 * @param id
 * @param callback
 */
var fn_getUser = function (id,callback) {
    console.log('执行查询数据库');
    var promise = new Promise(function (resolve, reject) {
        console.log('SELECT * FROM '+NODE_TABLE+' where id = '+id);
        conn.query(
            'SELECT * FROM '+NODE_TABLE+' where id = '+id,
            function selectCb(err, results, fields) {
                console.log(err,results,fields);
                if (err) {
                    throw err;
                }

                if(results)
                {
                    callback(results);
                    resolve(results);
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].sex);
                    }
                }
            }
        );
    });

    promise.then(function (value) {
        //成功
        var rs = {root:[],success:true};
        for(var i=0;i<value.length;i++){
            rs.root.push(value[i].username)
        }
        console.log(rs);
        return rs;
    }, function (value) {
        //失败
        console.log('查询失败');
    });

};

/***
 * 添加用户
 * @param param
 * @param callback
 */
var fn_addUser = function (param,callback) {
    conn.query(
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
    conn.query(
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
    getUser:fn_getUser,
    addUser: fn_addUser,
    delUser:fn_delUser
};
