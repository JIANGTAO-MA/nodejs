这是一个新闻发布系统（也可以是一个发布技术文章的博客，或者是一个企业网站）
目的：熟练技术的掌握
用的技术有nodejs express vue element-ui

用supervisor 启动

Nodejs express 获取url参数，post参数的三种方式
express获取参数有三种方法：官网实例：
Checks route params (req.params), ex: /user/:id
Checks query string params (req.query), ex: ?id=12
Checks urlencoded body params (req.body), ex: id=
1、例如：127.0.0.1:3000/index，这种情况下，我们为了得到index，我们可以通过使用req.params得到，通过这种方法我们就可以很好的处理Node中的路由处理问题，同时利用这点可以非常方便的实现MVC模式；
2、例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；
3、例如：127.0.0.1：300/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；
注意post请求，例如：
var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
// need it...
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});