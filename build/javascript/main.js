"use strict";var store=new Vuex.Store({state:{user_token:0},mutations:{userObj:function(s){this.state.user_token=s}}}),login=new Vue({el:"#login",store:store,data:{userObj:"",loginForm:{username:"",password:""},validateUsername:function(s,e,o){""===e?o(new Error("请输入用户名")):(""!==this.loginForm.username&&this.$refs.loginForm.validateField("username"),o())},validatePassword:function(s,e,o){""===e?o(new Error("请输入密码")):(""!==this.loginForm.password&&this.$refs.loginForm.validateField("password"),o())},login:{username:[{}],password:[{}]}},methods:{submitForm:function(s){var e=this,o=this.loginForm.username,t=this.loginForm.password;console.log(o,t),this.$http.get("/cgi/user/login?username="+o+"&password="+t).then(function(s){e.userObj=s.data,console.log("请求成功",s),console.log("返回结果",s.data),e.userObj.success&&(console.log("登录成功"),console.log(store.state.token))},function(s){console.log("请求失败")})},resetForm:function(s){this.$refs[s].resetFields()}}});