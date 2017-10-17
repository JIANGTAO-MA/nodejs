/**
 * Created by majiangtao on 2017/9/21.
 */
var sql = require('mysql');
var NODE_DATABASE = 'node_news';

var connection = sql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    port:'3306',
    database:NODE_DATABASE
});

connection.connect();

module.exports = {
    connection:connection
};