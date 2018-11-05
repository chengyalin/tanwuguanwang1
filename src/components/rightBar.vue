<template>
    <div class="rightBar">
        <div class="rightNavTop">
            <div class="twoIcon">
                <div class="showNavIcon"  @click="isActive = !isActive" >
                  <span class="showMenu" v-show="!isActive" >
                      <em class="lineBar lineBar1"></em>
                      <em class="lineBar lineBar2"></em>
                      <em class="lineBar lineBar3"></em>
                  </span>
                    <span class="showClose" v-if="isActive" ><img src="static/img/productCenterDetailClose.png" alt=""></span>
                </div>
                <div class="showLoginIcon" v-show="noLogin" @click="loginComponentsShow" ><img src="static/img/login.png" alt="" class="noLogin"></div>
                <div class="showLoginIcon" v-show="Login"  @click="userEditFlag = true">
                    <!--登陆已经编辑过图像-->
                    <img :src="selfInfo.headImg" alt=""  class="alreadyLogin" v-if="selfInfo.uuid">
                    <!--登陆还未上传头像使用默认头像-->
                    <img src="static/img/login2.png" alt="" class="alreadyLogin" v-else>
                </div>
            </div>
            <transition name="slideTran">
                <div class="slideNav" v-if="isActive">
                    <div class="slideNavMain">
                        <ul>
                            <li><router-link to="/indexPage" class="goPage"><span class="bgNavItem">Home</span></router-link></li>
                            <li><router-link to="/aboutUs" class="goPage"><span class="bgNavItem">关于我们</span></router-link></li>
                            <li><router-link to="/productCenter" class="goPage"><span class="bgNavItem">产品中心</span></router-link></li>
                            <li>
                                <router-link to="/userDynamics" class="goPage"><span class="bgNavItem">资讯动态</span></router-link>
                                <div class="childGoPage">
                                    <router-link to="/userDynamics" class="childPage"><span class="bgNavItem">用户动态</span></router-link>
                                    <router-link to="/graphicInformation" class="childPage"><span class="bgNavItem">/ 图文资讯 </span></router-link>
                                    <router-link to="/tanwuVideo" class="childPage"><span class="bgNavItem">/ 探物视频</span></router-link>
                                </div>
                            </li>
                            <li><router-link to="/contactUs" class="goPage"><span class="bgNavItem">联系我们</span></router-link></li>
                        </ul>
                        <div class="watchUsArea">
                            <p class="name">关注我们</p>
                            <div class="threeWatch">
                                <div class="watchOne wechatCodeShow">
                                    <img src="static/img/watch1.png" alt="" class="imgLinkIcon">
                                    <div class="wechatCodeShowArea">
                                        <img src="static/img/微信公众号@2x.png" alt="" class="wechatLeft">
                                        <div class="wechatRight">
                                            <h2>关注微信</h2>
                                            <p>获取更多优惠</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="watchOne"><a href="https://weibo.com/tanwuapp?topnav=1&wvr=6&topsug=1&is_all=1#_rnd1471516494575" target="_blank"><img src="static/img/watch2.png" alt="" class="imgLinkIcon"></a></div>
                                <div class="watchOne wechatCodeShow">
                                    <img src="static/img/watch3.png" alt="" class="imgLinkIcon">
                                    <div class="wechatCodeShowArea">
                                        <img src="static/img/APP下载@2x.png" alt="" class="wechatLeft">
                                        <div class="wechatRight">
                                            <h2>下载APP</h2>
                                            <p>获取更多优惠</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="twoLink">
                                    <router-link to="/joinUs" class="joinUsStyle"> 加入我们</router-link>
                                    <span>|</span>
                                    <router-link to="/leaseRules" class="joinUsStyle"> 租赁规则</router-link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="mask" v-if="isActive" @click="isActive = false"></div>
                </div>
            </transition>
        </div>

        <!--登录注册区域-->
        <Login v-show="LoginShow"  @close="closeLogin"></Login>
        <userEditer v-if = "userEditFlag" @close="closeUserEditer"></userEditer>
    </div>
</template>

<script>


    import Login from './Login'
    import userEditer from './userEditer'
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';

    export default {
        name: 'rightBar',
        components:{
            Login,
            userEditer
        },
        data () {
            return {
                isActive: false,
                loginComponentsArea:false,
                LoginShow: false,//登录框默认false
                userEditFlag:false,

                noLogin:true,//右上角没有登陆状态的icon
                Login:false,//右上角登陆状态
                selfInfo: "",

            }
        },
        created(){
            //登陆和未登录默认头像切换
            if(localStorage.getItem("twUser")) {
                this.noLogin=false;
                this.Login=true;
            }else{
                this.noLogin=true;
                this.Login=false;
            }
        },
        mounted(){
            var that = this;
            if(localStorage.getItem("selfInfo")) {
                this.selfInfo = JSON.parse(localStorage.getItem("selfInfo"));
            }
            //获取登陆后用户头像信息
            network(CONFIG.user, {}, {
                codeFlag: true
            }).then((res) => {
                if(res.head.code == 0) {
                    this.selfInfo = res.details;
                    localStorage.setItem("selfInfo", JSON.stringify(that.selfInfo))
                }
            })
        },
        methods:{
            loginComponentsShow(){//点右上角登录框显示
                this.LoginShow = true;
            },
            closeLogin(){//关闭登录
                this.LoginShow = false;
            },
            closeUserEditer(){//关闭编辑
                this.userEditFlag = false;
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rightNavTop{z-index:99;position: relative;}

    .twoIcon{width: 160px;height: 100px;position: fixed;z-index: 99;right: 0;top:0;}
    .twoIcon .showNavIcon{width: 80px;height: 80px;line-height: 80px;background:rgba(62,216,196,1);float: left;}
    .twoIcon .showNavIcon:hover{background-color: #38cdba;}
    .twoIcon .showNavIcon:hover .lineBar1{margin-left: 30px;}
    .twoIcon .showNavIcon:hover .lineBar2{margin-left: 25px;}
    .twoIcon .showNavIcon:hover .lineBar3{ width:19px;margin-left: 32px;}
    .twoIcon .showMenu{}
    .twoIcon .showMenu .lineBar{display:block; width:21px;height:3px;background:rgba(255,255,255,1);margin-bottom: 6px;margin-left: 27px;}
    .lineBar1{margin-top: 26px;}


    .twoIcon .showClose{margin: 30px;}
    .twoIcon .showLoginIcon{width: 80px;height: 80px;background:rgba(180,180,180,1);float: left}
    .twoIcon .showLoginIcon .noLogin{display:block;padding: 26px; width: 22px;height: 22px;}
    .twoIcon .showLoginIcon .alreadyLogin{display:block;padding: 20px; width: 38px;height: 38px;border-radius: 50%;}

    .slideNav{position:fixed;top:0;bottom:0px;right: 0;width:630px;height:100%;}
    .slideNav .slideNavMain{width:100%;height:100%;z-index: 99;position: relative;background:#fff;}
    .slideNav ul{padding: 100px 0 0 100px;}
    .slideNav li{width:100%;}
    .slideNav li .goPage{display:block;color:rgba(34,34,34,1);font-size: 32px;margin: 30px 0;}
    .slideNav li .childPage{font-size:16px;color:rgba(34,34,34,1);}
    .slideNav li .goPage.router-link-active .bgNavItem{display: inline-block; color: #fff; background-color: rgba(62,216,196,1);}
    .slideNav li .childPage.router-link-active .bgNavItem{display: inline-block; color: #fff; background-color: rgba(62,216,196,1);}
    .slideNav li .bgNavItem:hover{display: inline-block; color: #fff; background-color: rgba(62,216,196,1);}
    /*@media only screen and (max-width: 1366px) {*/
    /*.slideNav li .goPage{display:block;color:rgba(34,34,34,1);font-size: 32px;margin: 10px 0;}*/
    /*}*/

    /*.watchUsArea{margin-top: 100px;position: relative;}*/
    /*@media only screen and (max-width: 1366px) {*/
    /*.watchUsArea{margin-top: 30px;position: relative;}*/
    /*}*/
    .watchUsArea{position: absolute;width: 100%;left: 0px;bottom: 200px;}
    .watchUsArea .name{margin-left: 104px;font-size: 14px;color:rgba(136,136,136,1);line-height: 30px;}
    .watchUsArea .threeWatch{margin: 0 0 0 104px;position: relative;}
    .watchUsArea .threeWatch .watchOne{display: inline-block;width:36px;height:36px;background:rgba(180,180,180,1);}
    .watchUsArea .threeWatch .watchOne .imgLinkIcon{margin: 3px;}
    .watchUsArea .threeWatch .watchOne:hover{background:rgba(62,216,196,1);}

    .threeWatch .twoLink{position: absolute;right: 200px;top: 10px;}
    .threeWatch .twoLink .joinUsStyle{font-size: 14px;color:rgba(34,34,34,1);}
    .threeWatch .twoLink .joinUsStyle:hover{background:rgba(62,216,196,1);color: #fff;}
    .threeWatch .twoLink span{font-size: 14px;color:rgba(238,238,238,1);margin: 0 8px;}


    .watchUsArea .threeWatch .watchOne.wechatCodeShow:hover .wechatCodeShowArea{display: block;}

    .wechatCodeShowArea{display: none; width: 210px;height: 96px; border: 1px solid #EEEEEE;position: absolute;top:50px;left: 0;}
    .wechatCodeShowArea .wechatLeft{display: block;width: 83px;height: 83px;float: left;margin: 7px;}
    .wechatCodeShowArea .wechatRight{width: 100px;float: right;}
    .wechatCodeShowArea h2{font-size: 14px;color:rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
    .wechatCodeShowArea p{font-size: 12px;color:rgba(34,34,34,1);line-height: 26px;}

    .mask{width: 100%;height: 100%;position: fixed;left: 0;top: 0;right: 0;bottom: 0;background:rgba(0,0,0,.8);z-index: 98;}
    .slideTran-enter-active{transition: all .3s ease;right:0;}
    .slideTran-enter{right:-100%;}
    .slideTran-leave-active {transition: all .3s ease;right:-100%;}
    .slideTran-leave{right:0;}

</style>
