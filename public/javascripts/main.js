/**
 * Created by majiangtao on 2017/9/21.
 */

var login = new Vue({
    el:'#login',
    data:{
        loginForm:{
            username:'',
            password:''
        },
        validateUsername: function (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                if (this.loginForm.username !== '') {
                    this.$refs.loginForm.validateField('username');
                }
                callback();
            }
        },
        validatePassword: function (rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.loginForm.password !== '') {
                    this.$refs.loginForm.validateField('password');
                }
                callback();
            }
        },
        login:{
            username:[{
                validator: this.validateUsername, trigger: 'blur'
            }],
            password:[{
                validator: this.validatePassword, trigger: 'blur'
            }]
        }
    },
    methods:{
        submitForm: function (form) {
            var username = this.loginForm.username;
            var password = this.loginForm.password;
            console.log(username,password);

            //this.$refs[form].validate(function (valid) {
            //    if(valid){
            //        console.log('登录');
            //    }else{
            //        console.log('失败');
            //        return false;
            //    }
            //});
        },
        resetForm: function (form) {
            this.$refs[form].resetFields();
        }
    }
});