/**
 * Created by majiangtao on 2017/9/21.
 */

var sql = require('mysql');
var NODE_DATABASE = 'node_news';
var NODE_TABLE = 'users';

var connection = sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    port:'3306',
    database:NODE_DATABASE
});

connection.connect();

var abc = function () {
    var promise = new Promise(function (resolve, reject) {
        console.log('SELECT * FROM '+NODE_TABLE+' where id = '+id);
        connection.query(
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


module.exports = {
    abc:abc,
    conn:connection
};