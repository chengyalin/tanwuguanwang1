<template>
    <div class="Login" v-show="LoginAll">
        <!--登录注册区域-->
        <div class="loginRegisterArea">

            <div  v-show="loginCode" @click="ClickloginCode" class="rightLogin">
                <img src="static/img/logincode.png" alt="" class="loginCode" >
                <p class="wordIntro">APP 扫码下载</p>
            </div>
            <div  v-show="loginComputer" @click="ClickloginComputer" class="rightLogin">
                <img src="static/img/loginComputer.png" alt="" class="loginComputer">
                <p class="wordIntro">账号密码登录</p>
            </div>

            <div class="SwitchArea" v-show="loginCode">

                <!--登录-->
                <div class="loginArea" v-show="loginArea">
                    <div class="loginRegisterName">
                        <span class="colGreen" @click="LoginAreaShow">登录</span>
                        <i>|</i>
                        <span @click="registerShow">注册</span>
                    </div>
                    <div class="passwordLogin"  v-show="passwordLogin">
                        <ul class="loginWriteArea">
                            <li>
                                <label for="">手机号</label><input type="text" class="tel"  v-model="askData.phoneLogin" maxlength="11" placeholder="请输入手机号码">
                            </li>
                            <li v-if="pwdCode">
                                <label for="">密&nbsp;&nbsp;码</label><input :type="inputType" class="pwd" v-model="askData.passwordLogin" placeholder="请输入密码">
                                <span class="eyes" :class="{'pwd-eye-selected': pwdEye}"  @click="changeSeen"></span>
                            </li>
                            <li v-if="!pwdCode">
                                <label for="">验证码</label><input type="text" class="verification" v-model="askData.codeLogin"  placeholder="请输入验证码">
                                <span class="sendVerification" @click="sendCodeLogin">{{ showSecond1 }}</span>
                            </li>
                        </ul>
                        <button class="loginBtnSure" @click="submitFormLogin">登录</button>
                        <div class="pwdArea">
                            <span class="loginWay" v-show="!pwdCode" @click="pwdCode = !pwdCode">密码登录</span>
                            <span class="loginWay" v-show="pwdCode" @click="pwdCode = !pwdCode">验证码登录</span>

                            <span class="passwordForgeWord" @click="passwordForgetClick">忘记密码?</span>
                        </div>
                    </div>

                    <!--忘记密码-->
                    <div class="passwordForget" v-show="passwordForget">
                        <ul class="loginWriteArea">
                            <li>
                                <label for="">手机号</label><input type="text" class="tel" v-model="askData.phone" maxlength="11" placeholder="请输入注册手机号码">
                            </li>
                            <li>
                                <label for="">验证码</label><input type="text" class="verification"  v-model="askData.authCode" placeholder="请输入验证码">
                                <span class="sendVerification" @click="sendCodeReset">{{ showSecond2 }}</span>
                            </li>
                            <li>
                                <label for="">密&nbsp;&nbsp;码</label><input :type="inputType" class="pwd" v-model="passwordBefore1" placeholder="请输入密码">
                                <span class="eyes" :class="{'pwd-eye-selected': pwdEye}"  @click="changeSeen"></span>
                            </li>
                        </ul>
                        <button class="loginBtnSure" @click="submitFormReset">重置密码</button>
                        <div class="pwdArea">
                            <span class="passwordForgeWord"  @click="LoginAreaShow">返回登陆</span>
                        </div>
                    </div>
                </div>

                <!--注册-->
                <div class="regissterArea" v-show="regissterArea">
                    <div class="loginRegisterName">
                        <span @click="LoginAreaShow">登录</span>
                        <i>|</i>
                        <span  class="colGreen">注册</span>
                    </div>
                    <ul class="loginWriteArea">
                        <li>
                            <label for="">手机号</label><input type="text" class="tel" v-model="askData.phone" maxlength="11" placeholder="请输入注册手机号码">
                        </li>
                        <li>
                            <label for="">验证码</label><input type="text" class="verification" v-model="askData.code"  placeholder="请输入验证码">
                            <span class="sendVerification" @click="sendCode">{{ showSecond }}</span>
                        </li>
                        <li>
                            <label for="">密&nbsp;&nbsp;码</label><input :type="inputType" v-model="askData.password" class="pwd" placeholder="请输入密码">
                            <span class="eyes" :class="{'pwd-eye-selected': pwdEye}"  @click="changeSeen"></span>
                        </li>
                    </ul>
                    <button class="loginBtnSure" @click="submitFormRegister">注册</button>
                </div>


            </div>
            <!--二维码登录-->
            <div class="LoginCodeArea" v-show="loginComputer">
                <div class="codeBg">
                    <img src="static/img/APP下载@3x.png" alt="" class="codeImg">
                </div>
                <p class="intro">扫描二维码下载【探物app】</p>
            </div>

        </div>

        <div class="loginRegisterMask"  @click="loginBoxHide"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';
    import md5 from 'js-md5'

    export default {
        name: 'Login',

        data () {
            return {
                pwdCode:false,//密码验证码切换

                LoginAll:true,//整个页面
                loginCode:true,//右上角二维图标
                loginComputer:false,//右上角电脑图标

                loginchoose:true,//是否记住密码
                loginchooseNo:false,//是否记住密码

                passwordLogin:true,//登录区域
                passwordForget:false,//忘记密码默认false

                loginArea:true,//登陆区域
                regissterArea:false,//注册区域默认false

                pwdEye: false, // 密码可见和隐藏
                inputType:'password',//input的类型为text或者password


                passwordBefore1: '',//忘记密码

                // 注册板块的
                second1: 60,
                second2: 60,
                second: 60,
                showSecond1: "获取验证码",
                showSecond2: "获取验证码",
                showSecond: "获取验证码",
                askData: {
                    phoneLogin: '',//手机号登陆
                    codeLogin: '',//验证码登陆
                    passwordLogin: '',//密码登陆

                    phone: '',//手机号
                    code: '',//验证码
                    password: '',//密码
                    authCode:'',//忘记密码的验证码
                },

            }
        },
        created(){

        },
        mounted(){

        },
        methods:{
            loginBoxHide() {
                this.$emit('close',true)
            },
            ClickloginCode(){//右上角电脑和二维码图标
                this.loginCode=false;
                this.loginComputer=true;
            },
            ClickloginComputer(){//右上角电脑和二维码图标
                this.loginCode=true;
                this.loginComputer=false;
            },
            passwordForgetClick(){//点击忘记密码
                this.passwordLogin=!this.passwordLogin;
                this.passwordForget=!this.passwordForget;
            },
            registerShow(){//点击注册
                this.loginArea=false;
                this.regissterArea=true;
            },
            LoginAreaShow(){//点击登陆
                this.loginArea=true;
                this.regissterArea=false;
                this.passwordLogin=true;//登陆区域显示
                this.passwordForget=false;//忘记密码区域隐藏
            },

            changeSeen(){//展示与隐藏密码
                this.pwdEye = !this.pwdEye;
                this.inputType = this.pwdEye ? 'text' : 'password'
            },


            //点击登陆提交
            submitFormLogin(){
                var that = this
                var client_type; // 默认类型
                var reg_pwd = /^[0-9a-zA-z]{6,}$/;
                var reg_tel = /^1\d{10}$/;
                var reg_zipcode = /^\d{6}$/;

                // 验证码
                if(!that.pwdCode) {
                    var _askData = {
                        phone: that.askData.phoneLogin.trim(),
                        code: that.askData.codeLogin.trim(),
                        client_type: client_type
                    }
                    if(!reg_tel.test(_askData.phone)) {
                        Vue.toast('手机号码不合格', {duration: 1500});
                        return false
                    }
                    if(!_askData.code.trim().length) {
                        // alert('验证码不能为空')
                        Vue.toast('验证码不能为空', {duration: 1500});
                        return false
                    }
                    network(CONFIG.userLoginSMS, _askData).then((res) => {
                        if(res.head.code == 0) {
                            // alert('登录成功')
                            Vue.toast('登录成功', {duration: 1500});
                            localStorage.setItem("twUser", JSON.stringify(res.details));
                            that.LoginAll=!that.LoginAll
                            this.$router.go(0)
                        } else {
                            //alert(res.head.message)
                            Vue.toast(res.head.message, {duration: 1500});

                        }
                    })
                } else {
                    var askDataPwd = {
                        phone: that.askData.phoneLogin.trim(),
                        password: that.askData.passwordLogin.trim(),
                        deviceToken: '',
                        installationId: '',
                        client_type: client_type,
                        type: "web",
                        client: "web",
                        blackBox: typeof(_fmOpt) != "undefined" ? _fmOpt.getinfo() : ""
                    }
                    if(!reg_tel.test(askDataPwd.phone)) {
                        // alert('手机号码不合格')
                        Vue.toast('手机号码不合格', {duration: 1500});
                        return false
                    }
                    if(!reg_pwd.test(askDataPwd.password)) {
                        // alert('密码不合格');
                        Vue.toast('密码不合格', {duration: 1500});
                        return false
                    } else {
                        askDataPwd.password = md5(askDataPwd.password);
                    }
                    network(CONFIG.login, askDataPwd, {
                        codeFlag: true
                    }).then((res) => {
                        if(res.head.code == 0) {
                            // alert('登录成功')
                            Vue.toast('登录成功', {duration: 1500});
                            localStorage.setItem("twUser", JSON.stringify(res.details));
                            that.LoginAll=!that.LoginAll;
                            this.$router.go(0)
                        } else {
                            // alert(res.head.message)
                            Vue.toast(res.head.message, {duration: 1500});
                        }
                    })
                }
            },
            //登陆发送验证码
            sendCodeLogin() {
                var that = this
                var reg_tel = /^1\d{10}$/;
                if(!reg_tel.test(that.askData.phoneLogin)) {
                    // alert('手机号码不合格');
                    Vue.toast('手机号码不合格', {duration: 1500});
                    return false;
                }
                if(!that.ifSendCode) {
                    that.showSecond1 = "剩余" + that.second1 + "s";
                    that.ifSendCode = true;
                    that.countdown(that.second1,that.showSecond1);
                    var _askData = {
                        phone: that.askData.phoneLogin,
                        useType: 1
                    }
                    network(CONFIG.userSMScode, _askData, {
                        codeFlag: true
                    }).then((res) => {
                        if(res.head.code == 0) {
                            that.ifRegist = res.result.registered
                        } else {
                            that.second1 = 1;
                            //alert(res.head.message)
                            Vue.toast(res.head.message, {duration: 1500});
                        }
                    })
                }
            },




            //忘记密码重置提交
            submitFormReset(){
                var that = this
                var reg_pwd = /^[0-9a-zA-z]{6,}$/;
                var reg_tel = /^1\d{10}$/;
                var reg_zipcode = /^\d{6}$/;
                if (!reg_tel.test(that.askData.phone)) {
                    //alert('手机号码不合格')
                    Vue.toast('手机号码不合格', {duration: 1500});
                    return false
                }
                var askDataForget = {
                    phone: that.askData.phone,
                    authCode: that.askData.authCode,
                    password :md5(that.passwordBefore1)
                }
                network(CONFIG.userForgetPwd, askDataForget, {codeFlag:true}).then((res) => {
                    if (res.head.code == 0) {
                        // alert('修改密码成功')
                        Vue.toast('修改密码成功,请登录', {duration: 1500});

                        //登录框板块显示
                        that.LoginAreaShow();
                    } else {
                        // 报错信息
                        // alert(res.head.message)
                        Vue.toast(res.head.message, {duration: 1500});
                    }
                })
            },
            //忘记密码重置发送验证码
            sendCodeReset () {
                var that = this
                var reg_tel = /^1\d{10}$/;
                if(!reg_tel.test(that.askData.phone)) {
                    // alert('手机号码不合格')
                    Vue.toast('手机号码不合格', {duration: 1500});
                    return false;
                }
                if (!that.ifSendCode) {
                    that.showSecond2 = "剩余" + that.second2 + "s";
                    that.ifSendCode = true;
                    that.countdown(that.second2,that.showSecond2);
                    var _askData = {
                        phone: that.askData.phone,
                        useType: 3
                    }
                    network(CONFIG.userSMScode, _askData,  {codeFlag:true}).then((res) => {
                        if (res.head.code == 0) {
                            // alert('发送成功')
                            Vue.toast('发送成功', {duration: 1500});
                        } else {
                            that.second2= 1;
                            // 错误信息
                            // alert(res.head.message)
                            Vue.toast(res.head.message, {duration: 1500});
                        }
                    })
                }
            },





            //注册提交
            submitFormRegister(){
                var that = this
                var client_type; // 默认类型
                var reg_pwd = /^[0-9a-zA-z]{6,}$/;
                var reg_tel = /^1\d{10}$/;
                var reg_zipcode = /^\d{6}$/;
                if(!reg_tel.test(that.askData.phone.trim())) {
                    // alert('手机号码不合格')
                    Vue.toast('手机号码不合格', {duration: 1500});
                    return false
                }
                if(that.askData.code.trim().length == 0) {
                    // alert('验证码不能为空')
                    Vue.toast('验证码不能为空', {duration: 1500});
                    return false
                }
                if(!reg_pwd.test(that.askData.password)) {
                   // alert('密码不合格')
                    Vue.toast('密码不合格', {duration: 1500});
                    return false
                }
                that.askData.password = md5(that.askData.password.trim());
                that.askData.blackBox = typeof(_fmOpt) != "undefined" ? _fmOpt.getinfo() : "";
                network(CONFIG.register, that.askData, {
                    codeFlag: true
                }).then((res) => {
                    if(res.head.code == 0) {
                        // alert('注册成功')
                        Vue.toast('注册成功', {duration: 1500});
                        localStorage.setItem("twUser", JSON.stringify(res.details));
                        that.LoginAll=!that.LoginAll;
                        this.$router.go(0);
                    } else {
                        //报错信息
                        // alert(res.head.message)
                        Vue.toast(res.head.message, {duration: 1500});
                    }
                })

            },
            //注册发送验证码
            sendCode() {
                var that = this
                var reg_tel = /^1\d{10}$/;
                if(!reg_tel.test(that.askData.phone)) {
                    // alert('手机号码不合格');
                    Vue.toast('手机号码不合格', {duration: 1500});
                    return false;
                }
                if(!that.ifSendCode) {
                    that.showSecond = "剩余" + that.second + "s";
                    that.ifSendCode = true;
                    that.countdown(that.second,that.showSecond);
                    var _askData = {
                        phone: that.askData.phone,
                        useType: 1
                    }
                    network(CONFIG.checkTelCode, _askData, {
                        codeFlag: true
                    }).then((res) => {
                        if(res.head.code == 0) {
                            that.ifRegist = res.result.registered
                        } else {
                            that.second = 1;
                            // alert(res.head.message)
                            Vue.toast(res.head.message, {duration: 1500});
                        }
                    })
                }
            },

            //倒计时
            countdown(secondParameter,showSecondParameter) {
                var that = this;
                var secondParameter = that.secondParameter;
                if(secondParameter == 0) {
                    that.showSecondParameter = "重新获取";
                    that.secondParameter = 60;
                    that.ifSendCode = false;
                    return false;
                };
                setTimeout(() => {
                    that.secondParameter = that.secondParameter - 1;
                    that.showSecondParameter = "剩余" + that.secondParameter + "s";
                    that.countdown(secondParameter,showSecondParameter);
                }, 1000)
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*登录注册   */
    .SwitchArea{padding: 50px 60px;}
    .loginRegisterArea{width: 520px;height: 620px;background-color: #fff; position: fixed;left: 50%;top:50%;margin-left: -260px;margin-top: -310px;z-index: 106;}
    .loginRegisterMask{width: 100%;height: 100%;position: fixed;left: 0;top: 0;right: 0;bottom: 0;background:rgba(0,0,0,.8);z-index: 99;}
    /*右上角切换*/
    .rightLogin{}
    .wordIntro{display: none; width: 95px;height: 22px;line-height: 23px; background: url(../../static/img/loginRight.png) no-repeat;font-size: 12px;color:rgba(255,255,255,1);
        position: absolute;top:30px;right: 80px;padding-left: 2px;}
    .rightLogin:hover .wordIntro{display: block;}
    .loginComputer,.loginCode{width: 50px;height: 50px;position: absolute;top:0px;right: 0px;padding: 20px 20px 0 0;}/*右上角切换图标*/

    .loginComputerArea{padding: 50px 60px 0 60px;}


    /*登录*/
    .loginArea{margin-bottom: 50px;}
    .loginRegisterName{    padding: 50px 0px 40px 0;}
    .loginRegisterName span{font-size: 24px;color:rgba(136,136,136,1);font-weight: 600;height: 24px;line-height: 24px;cursor: pointer;}
    .loginRegisterName i{color:rgba(238,238,238,1);margin:0 14px;font-size: 24px;}
    .loginRegisterName .colGreen{color:rgba(62,216,196,1);}

    .loginWriteArea{}
    .loginWriteArea li{width: 400px;position: relative;margin-bottom: 10px;}
    .loginWriteArea li label{width: 92px; height:48px;line-height: 48px; text-align: center;position: absolute;left: 0;top:0;font-size: 14px;color:rgba(102,102,102,1);}
    .loginWriteArea li input{width:310px;padding-left: 92px; height:48px;background:rgba(246,246,246,1);border: none;}
    .loginWriteArea li .sendVerification{font-size: 12px;color:rgba(62,216,196,1);position: absolute;right: 20px;top:15px;cursor: pointer;}
    .loginWriteArea li .seeNo{font-size: 12px;color:rgba(170,170,170,1);position: absolute;right: 100px;top:14px;cursor: pointer;line-height: 22px;}
    /*.loginWriteArea li .seeNo:hover{border-bottom: 1px solid rgba(170,170,170,1);}*/
    .loginWriteArea li .verificationImg{width: 88px;height: 37px;position: absolute;right: 0px;top:5px;cursor: pointer;}

    .loginBtnSure{width:400px;height:48px;line-height: 48px;background:rgba(62,216,196,1);font-size: 16px;color:rgba(255,255,255,1);border: none;margin-top: 30px;}

    /*密码显示隐藏*/
    .loginWriteArea li .eyes{background-image: url(../../static/img/icon-pwd-hide.png);display: inline-block;width:16px;height:8px;position: absolute;right: 10px;top: 22px;cursor: pointer;}
    .loginWriteArea li .eyes.pwd-eye-selected {background-image: url(../../static/img/icon-pwd-visible.png);}

    /*错误信息*/
    .loginWriteArea li .errorInfo{width: 100%; font-size: 12px;color:rgba(212,60,50,1);height: 34px;line-height: 34px;border-top: 2px solid rgba(212,60,50,1);
        animation:myfirst 3s;
        -moz-animation:myfirst 3s; /* Firefox */
        -webkit-animation:myfirst 3s; /* Safari and Chrome */
        -o-animation:myfirst 5s; /* Opera */
    }

    @keyframes myfirst
    {
        0%   {width: 40%}
        100% {width: 100%}
    }


    /*记住密码或忘记密码*/
    .pwdArea{padding-top: 20px;}
    .remberPwd{cursor: pointer;width: 200px;float: left;}
    .remberPwd .loginchoose{vertical-align: middle;}
    .remberPwd .loginchooseNo{display: inline-block;width: 16px;height: 16px;border: 1px solid rgba(246,246,246,1);border-radius: 50%;vertical-align: middle;}
    .remberPwd .chooseWord{font-size: 14px;color:rgba(68,68,68,1);}
    .pwdArea .passwordForgeWord{cursor: pointer;font-size: 14px;color:rgba(68,68,68,1);float: right;}

    .loginWay{cursor: pointer;}


    /*二维码登录*/
    .LoginCodeArea{}
    .LoginCodeArea .codeBg{width:200px;height:200px;background:rgba(240,240,240,1);margin: 140px auto 0;padding: 10px;position: relative;}
    .LoginCodeArea .codeBg .codeImg{display: block;width: 200px;height: 200px;}
    .LoginCodeArea .intro{font-size: 16px;color:rgba(34,34,34,1);text-align: center;margin-top: 30px;}
    /*二维码失效*/
    .codeLose{position: absolute;z-index: 105;top:0;left: 0;background:rgba(0,0,0,.6);width: 100%;height: 100%;}
    .codeLose .introTip{font-size: 18px;color:rgba(255,255,255,1);text-align: center;margin: 70px 0 18px;}
    .codeLose .refurbish{display: block;width: 70px;height: 30px;margin: 0 auto;cursor: pointer;}

</style>
