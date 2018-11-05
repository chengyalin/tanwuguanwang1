<template>
    <div class="indexPage" v-title data-title="首页">
        <img src="static/img/logo.png" alt="" class="logo">
        <rightBar></rightBar>
        <div class="bannerArea">
            <router-link to="/productCenter"><div class="bgLeft"><span class="rentGO animationLR">开启租赁之旅</span></div></router-link>
            <div class="bgRight"></div>
            <!-- Swiper -->
            <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length>0">
                <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
                    <router-link to="/productCenter" tag="a" class="productAreaBanner" >
                        <img :src="item.bannerImageSrc" alt="" class="scrollImg">
                        <!--banner图介绍文字-->
                        <!--<div class="BannerRightTop">
                            <p class="name">VR 游戏机</p>
                            <p class="intro">应该有的沉浸畅快的游戏来放松紧绷 的神经，调节疲惫的身心。</p>
                            <p class="go"><span>立即租赁</span> <img src="static/img/bannergo.png" alt=""></p>
                        </div>
                        <div class="BannerRightBot">
                            <img src="static/img/bannerIcon.png" alt="" class="bannerIcon">
                            <p class="introOne">全新的体验！</p>
                            <p class="introTwo">采用了一块 6.42 英寸的双曲面柔性屏，官方称之为「曲面全景屏」</p>
                        </div>-->
                    </router-link>
                </div>

                <!-- Add Pagination -->
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="bgGreenfixed">
                <div class="squreBlock">
                    <i class="circle"></i>
                </div>
                <p class="wordTS">探索</p>
            </div>
        </div>

        <div class="weDuty">
            <p class="name">我们致力于搜刮一切有趣好玩的新奇数码</p>
            <p class="intro">从探索到发现，我们的目的就是为了让你收获惊喜</p>
            <!--<div class="viedoWatch">
                <a :href="videoOne.index_video" target="_blank">
                    <div class="videoImg" :style="{'background-image':'url('+videoOne.index_cover+')'}"><i class="VideoIcon"></i></div>
                    <p class="whatchTV"> <span class="learnMore">观看探物宣传视频 <em class="goAnimation"> > </em></span></p>
                </a>
            </div>-->
            <div class="viedoWatch">
                <div class="videoImg" v-if="!playFlag" @click = "playFlag = true" :style="{'background-image':'url('+videoOne.index_cover+')'}" onclick="document.getElementById('video').play()"><i class="VideoIcon"></i></div>
                <video :src="videoOne.index_video" id="video" controls="controls" class="videoOkPlay">
                    当前浏览器不支持 video直接播放,请升级
                </video>
                <p class="whatchTV"> <span class="learnMore" onclick="document.getElementById('video').play()">观看探物宣传视频 <em class="goAnimation"> > </em></span></p>
            </div>
        </div>


        <div class="developmentHistory">

            <div class="devHistoryArea">
                <div class="oneHistory">
                    <div class="left">
                        <div class="verticalLine">
                            <p class="wordNum">01</p>
                        </div>
                        <img src="static/img/ICON1-花呗@2x.png" alt="" class="historyIcon" />
                        <h2 class="title">花呗分期付款</h2>
                        <p class="introduction">芝麻分 650 分以上可享受押金减免服务，芝麻分数越高，免押额度越多，最高可实现押金全免，所有产品均适用。每一次用芝麻分下单，都让你的芝麻信用更有价值。</p>
                        <router-link to="/serviceTerms" class="learnMore">了解更多<em class="goAnimation"> > </em></router-link>
                    </div>
                </div>
                <div class="oneHistory">
                    <div class="left">
                        <div class="verticalLine">
                            <p class="wordNum">02</p>
                        </div>
                        <img src="static/img/ICON2-芝麻@2x.png" alt="" class="historyIcon" />
                        <h2 class="title">绑定芝麻分免押金 </h2>
                        <p class="introduction">长租产品在支付租金时可启用花呗，分期付款零利息，减轻你的资金压力。押金部分也可用芝麻分减免，双管齐下，让长租产品的租赁体验更划算。</p>
                        <router-link to="/serviceTerms" class="learnMore">了解更多<em class="goAnimation"> > </em></router-link>
                    </div>
                </div>
            </div>

            <div class="devHistoryArea">
                <div class="devHistoryAreaTwo">
                    <div class="oneHistory">
                        <div class="left">
                            <div class="verticalLine">
                                <p class="wordNum">03</p>
                            </div>
                            <img src="static/img/ICON3-产品@2x.png" alt="" class="historyIcon" />
                            <h2 class="title">海量产品任意选</h2>
                            <p class="introduction">我们产品包括但不仅限于：手机、相机、镜头、无人机、游戏机、音响、耳机、投影机等。囊括各大 3C 数码品牌如：佳能、索尼、尼康、任天堂、大疆、GoPro、BOSE等。 <br /> 只要你想，只要我有。</p>
                            <router-link to="/serviceTerms" class="learnMore">了解更多<em class="goAnimation"> > </em></router-link>
                        </div>
                    </div>
                    <div class="oneHistory">
                        <div class="left">
                            <div class="verticalLine">
                                <p class="wordNum">04</p>
                            </div>
                            <img src="static/img/ICON4-保险@2x.png" alt="" class="historyIcon" />
                            <h2 class="title">产品意外保险</h2>
                            <p class="introduction">产品下单时购买意外保险，在租赁期间，因人为造成的产品磨损、毁坏、进水、和快递运输寄回中所导致的维修风险，用户只需承担 30% 的维修费。你可以尽情享受产品使用的过程，不用担心损坏而造成的赔偿。</p>
                            <router-link to="/serviceTerms" class="learnMore">了解更多<em class="goAnimation"> > </em></router-link>
                        </div>
                    </div>

                </div>
            </div>

            <div class="downApp">
                <span class="downInfo">--立即开启共享生活，享受前沿科技！</span>
                <div class="downNow">
                    <img src="static/img/二维码@2x.png" alt="" class="iconDownCode" />下载探物APP
                    <div class="CodeShowArea">
                        <img src="static/img/APP下载.png" alt="" class="wechatLeft">
                        <div class="wechatRight">
                            <h2>扫二维码</h2>
                            <p>即可下载APP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="InformationZX">
            <div class="InformationMain">
                <div class="topArea">
                    <h2 class="title">资讯动态</h2>
                    <p class="intro">一起分享生活，一起收获惊喜</p>
                    <router-link to="/userDynamics" class="understandMore">了解更多</router-link>
                </div>
                <div class="scrollAreaZX">
                    <div class="scrollActionMain">
                        <div class="scrollItem">
                            <!-- Swiper -->
                            <swiper :options="swiperOptionZX" ref="mySwiper">
                                <div class="swiper-slide" v-for="(item,index) in productsListZX" :key = "(item,index)">
                                    <div class="InformationOne">
                                        <div class="imgZX"><img :src="item.themeBigImage" alt="" class="imgZX"></div>
                                        <div class="userInfoTime">
                                            <img :src="item.sourceLogo" alt="" class="userLOGO">
                                            <span class="name">{{item.sourceName}}</span>
                                            <i class="circle">.</i>
                                            <span class="time">{{item.datetime | formatTime11}}</span>
                                        </div>
                                        <h2 class="title">{{item.themeTitle}}</h2>
                                        <p class="intro">{{item.themeSubtitle}}</p>
                                        <router-link to="" class="readMore">READ MORE  ></router-link>
                                    </div>
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-button-prev" slot="button-prev"></div>
                                <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="aboutUsArea">
            <div class="aboutUsAreaMain">
                <div class="topArea">
                    <h2 class="title">关于我们</h2>
                    <p class="intro">新奇科技数码租赁平台</p>
                </div>
                <div class="usMain">
                    <div class="leftArea">
                        <div class="oneHistory">
                            <div class="left">
                                <div class="verticalLine">
                                    <p class="wordNum">01</p>
                                </div>
                                <h2 class="title">我们是谁？</h2>
                                <p class="introduction">探物（tanworth）成立于2016年3月，是国内首家引领新奇科技数码租赁模式的成长型企业，目前在深圳、北京、武汉、杭州、厦门有5个网点分布，用户通过探物App可以租借到心仪的各类数码产品。</p>
                            </div>
                        </div>
                        <div class="oneHistory">
                            <div class="left">
                                <div class="verticalLine">
                                    <p class="wordNum">02</p>
                                </div>
                                <h2 class="title">我们做什么？</h2>
                                <p class="introduction">探物（tanworth）为用户提供最新、最酷和最为实用的科技数码产品，用户通过探物选择心仪的科技产品进行付费租赁，并创作分享高质量、好玩的科技视频和图文资讯，用户也能在探物发表产品的使用口碑，交流体验心得。 </p>
                            </div>
                        </div>
                        <router-link to="" class="understandMoreUs">了解更多</router-link>
                    </div>
                </div>
            </div>
            <img src="static/img/indexaboutus.png" alt="" class="rightArea">
        </div>

        <div class="ourPartner">
            <div class="ourPartnerMain">
                <div class="topArea">
                    <h2 class="title">合作伙伴</h2>
                    <p class="intro">前进的路上，我们一起成长收获感动</p>
                </div>
            </div>
            <div class="scrollLogoArea">
                <!-- Swiper -->
                <swiper :options="swiperOptionLOGO" ref="mySwiper">
                    <div class="swiper-slide">
                        <div class="logoPartner" >
                            <img src="static/img/1@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/2@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/3@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/4@2x.png" alt="">
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/5@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/6@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/7@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/8@2x.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="logoPartner" >
                            <img src="static/img/8@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/10@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/11@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/12@2x.png" alt="">
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/13@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/14@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/15@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/16@2x.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="logoPartner" >
                            <img src="static/img/17@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/18@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/19@2x.png" alt="">
                            <i class="rightLine"></i>
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/20@2x.png" alt="">
                            <i class="bottomLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/21@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/22@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/23@2x.png" alt="">
                            <i class="rightLine"></i>
                        </div>
                        <div class="logoPartner" >
                            <img src="static/img/24@2x.png" alt="">
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>

            </div>
        </div>

        <rightScrollTop></rightScrollTop>
        <footerBar></footerBar>
    </div>
</template>

<script>
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';
    import rightBar from './rightBar'
    import rightScrollTop from './rightScrollTop'
    import footerBar from './footerBar'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'indexPage',
        components: {
            rightBar,
            rightScrollTop,
            footerBar,
            swiper,
            swiperSlide
        },
        data () {
            return {
                playFlag:false,//视频背景显示隐藏
                swiperOption:{//BANNER
                    loop: true,//循环
                    notNextTick: true,
                    autoplay: true, //自动轮播
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                },

                swiperOptionZX:{//资讯板块轮播
                    notNextTick: true,
                    slidesPerView: 3.5,
                    slidesPerGroup: 3,
                    loop: false,
                    loopFillGroupWithBlank: true,//最后一个后面的空白

                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                },

                swiperOptionLOGO:{//合作伙伴
                    loop: true,//循环
                    notNextTick: true,
                    autoplay: true, //自动轮播
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                },
                bannerList:[],//banner图
                productsListZX:[],//资讯
                videoOne:{},//视频
            }
        },
        created(){
            var that = this;
            that.getData();//banner
        },
        mounted() {

        },
        methods:{
            getData(){//banner
                var that = this;
                network(CONFIG.banners,{clientType:'web:h5',token:'dGFud3VhcHBBUEkxNTM0OTI2NTI1MDE0ZWk2bW94'},{method:'GET'}).then((res) => {
                    console.log(res)
                    that.bannerList=res.details.banners;//banner
                    that.videoOne=res.details.videos;//视频
                    that.productsListZX=res.details.themes;//资讯
                });
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .bannerArea{position: relative;}
    .bannerArea .bgLeft{width: 70%;height:950px;position: absolute;top:0;left: 0;background: rgba(247,247,247,1);}
    .bannerArea .bgRight{width: 29.9%;height:950px;position: absolute;top:0;right: 0;background: url(../../static/img/IndexBannerBg2.jpg) no-repeat center center;}

    .bannerArea .productAreaBanner{position: relative;text-align: left;}

    .BannerRightTop{position: absolute;width: 250px;position: absolute;top:0;right: -120px;padding-left: 20px;border-left:1px solid rgba(34,34,34,1);}
    .BannerRightTop .name{font-size: 18px; font-weight:400;color:rgba(34,34,34,1);line-height: 18px; margin-bottom: 10px;}
    .BannerRightTop .intro{font-size: 14px;font-weight:400;color:rgba(102,102,102,1);line-height:24px;margin-bottom: 20px;}
    .BannerRightTop .go{font-size:12px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(170,170,170,1);line-height:24px;}
    .BannerRightTop .go img{vertical-align: middle;margin-top: -2px;}

    .BannerRightBot{position: absolute;width: 180px;position: absolute;top:500px;right: -100px;}
    .BannerRightBot .bannerIcon{position: absolute;left: -40px;top:0;}
    .BannerRightBot .introOne{font-size:12px;color:rgba(102,102,102,1);line-height:34px;}
    .BannerRightBot .introTwo{width:180px;font-size:12px;font-family:MicrosoftYaHei;font-weight:400;color:rgba(102,102,102,1);line-height:18px;}


    .bannerArea /deep/ .swiper-slide {
        text-align: center;
        font-size: 18px;
        height:950px;
        width: 70%;
        /*background:rgba(247,247,247,1);*/
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        z-index: 15;
    }
    /*.bannerArea /deep/ .swiper-slide:nth-child(2n) {background:#34606A;}*/
    .bannerArea /deep/ .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets{left: 69.9%;width: 4px;height: 100%;}
    .bannerArea /deep/ .swiper-pagination-bullet{width: 4px;height: 75px;border-radius: unset;margin: 0;}
    .bannerArea /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active{background:rgba(62,216,196,1);}

    .bannerArea  /deep/ .swiper-slide .scrollImg{width: 750px;height: 750px;}

    .rentGO{display: block; font-size: 14px;color:rgba(34,34,34,1);width: 170px;height: 54px;line-height: 54px; border: 1px solid rgba(34,34,34,1);margin: 50px auto 0;
        position: relative;z-index: 99;position: absolute;left: 44%;bottom: 110px;text-align: center;cursor: pointer;}
    .rentGO.animationLR:hover,
    .rentGO.animationLR:focus {border-color: var(--hover);color: #fff;box-shadow: inset 170px 0 0 0 var(--hover);}
    .rentGO.animationLR {--color: #222;--hover: #3ED8C4;display: block;background: none;color: var(--color);-webkit-transition: 0.25s;transition: 0.25s;}


    .bgGreenfixed{width: 110px;height: 214px;background:rgba(72,197,181,1); position: absolute;left: 67.1%;bottom: 0;z-index: 2;}
    .bgGreenfixed .squreBlock{width: 13px;height: 24px;border: 1px solid #000;margin: 70px auto 0;}
    .bgGreenfixed .squreBlock .circle{display: block;width: 3px;height: 3px;background-color: #000;border-radius: 50%;margin: 10px auto;
        -webkit-animation-name: updown;
        animation-name: updown;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-duration: 1.2s;
        animation-duration: 1.2s;}
    .bgGreenfixed .wordTS{font-size: 12px;color:rgba(34,34,34,1);text-align: center;line-height: 30px;}



    .weDuty{width: 70%;padding:38px 0 160px;background:rgba(247,247,247,1);text-align: center;position: relative;}
    .weDuty .name {color:rgba(34,34,34,1);font-size:30px;line-height:60px;}
    .weDuty .intro{color:rgba(34,34,34,1);font-size: 16px;line-height: 60px;}
    .weDuty .viedoWatch{position: absolute;bottom:-200px;right: -270px;width: 590px;height: 350px;z-index: 2;}
    .weDuty .viedoWatch .whatchTV{font-size: 14px;color:rgba(62,216,196,1);line-height: 60px;display: block;text-align: left;}
    .weDuty .viedoWatch .videoImg{width: 590px;height: 350px;background-size: cover;position: absolute;top:0;left: 0;z-index: 2;}
    .weDuty .viedoWatch .videoImg:after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 200px;
        height: 200px;
        background: url(../../static/img/videoImg.png) no-repeat center center;
        background-size: cover;
        left: 50%;
        margin-left: -100px;
        top: 50%;
        margin-top: -100px;
        z-index: 2;
        opacity: 0;
        -moz-transition: opacity .3s ease;
        -webkit-transition: opacity .3s ease;
        -o-transition: opacity .3s ease;
    }
    .weDuty .viedoWatch .videoImg:hover:after {opacity: 1;}

    .weDuty .viedoWatch .videoImg  .VideoIcon{position: absolute;
        width: 200px;
        height: 200px;
        background: url(../../static/img/videoImgDefult.png);
        background-size: cover;
        left: 50%;
        margin-left: -100px;
        top: 50%;
        margin-top: -100px;
        z-index: 2;
        opacity: 1;}
    .weDuty .viedoWatch .videoOkPlay{width:590px;height: 350px;}

    /*发展历程*/
    .developmentHistory{margin-top: 280px; padding-bottom: 100px;position: relative;}
    .devHistoryArea{width: 1000px;height:360px; margin: 50px auto 80px;}
    .devHistoryAreaTwo{height: auto;overflow: hidden;width:725px;padding-left: 355px;}
    .oneHistory{position: relative;width: 285px;height: auto;overflow: hidden;float: left;margin-right: 70px;}
    .oneHistory.margR{margin-right:1px;}
    .oneHistory .left{padding-left: 57px;padding-top: 90px;position: relative;}
    .oneHistory .left .verticalLine{width:2px;height:100px;background:rgba(170,170,170,1);position: absolute;top:95px;left: 0;}
    .oneHistory .left .verticalLine .wordNum{font-size:16px;color:rgba(170,170,170,1);padding-left: 8px;}
    .oneHistory .left .historyIcon{position: absolute;top:0;left: 60px;}
    .oneHistory .left .title{font-size: 20px;color: #222;margin-bottom: 28px;font-weight: 600;}
    .oneHistory .left .introduction{font-size: 14px;color: #666;line-height:26px;}
    .oneHistory .left .learnMore{display: inline-block;line-height: 30px;; font-size: 14px;color: #AAA;margin-top: 20px;}
    .oneHistory .left .learnMore:hover{}

    .downApp{width:1110px;padding-left: 40px; height:68px;background:rgba(62,216,196,1);position: absolute;bottom: 0;right: 0;}
    .downInfo{display: inline-block;height: 68px;line-height: 68px;width: 300px;float: left;color: #fff;}
    .downNow{cursor: pointer;width: 160px;height: 40px;line-height: 40px;background-color: #fff;float: left;margin-top: 12px;font-size:14px; color:#48C5B5;position: relative;}
    .downNow .iconDownCode{display: inline-block;vertical-align: middle;margin: 0 10px 0 20px;}
    .downNow:hover .CodeShowArea{display: block;}
    .downNow .CodeShowArea{display: none; width: 210px;height: 96px; border: 1px solid #EEEEEE;position: absolute;top:50px;left: 0;background-color: #fff;}
    .downNow .CodeShowArea .wechatLeft{display: block;width: 83px;height: 83px;float: left;margin: 7px;}
    .downNow .CodeShowArea .wechatRight{width: 100px;float: right;}
    .downNow .CodeShowArea h2{font-size: 14px;color:rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
    .downNow .CodeShowArea p{font-size: 12px;color:rgba(34,34,34,1);line-height: 26px;}

    /*资讯板块*/
    .InformationZX{height: 1000px;background:rgba(242,242,242,1);}
    .InformationZX .InformationMain{width: 1000px;margin:0 auto ;padding-top: 136px}
    .InformationZX .topArea{position: relative;margin-bottom: 50px;}
    .InformationZX .topArea .title{font-size: 34px;color:rgba(34,34,34,1);line-height: 36px;}
    .InformationZX .topArea .intro{font-size: 16px;color:rgba(102,102,102,1);line-height: 36px;margin-top: 10px;}
    .InformationZX .topArea .understandMore{display: block; width: 140px;height: 40px;line-height: 40px;border: 1px solid rgba(34,34,34,1);color:rgba(34,34,34,1);text-align: center;position: absolute;left: 830px;top: 26px;}

    .scrollAreaZX{width: 1500px;height: 780px;overflow: hidden; background-color: #fff;}
    .scrollAreaZX{}
    .scrollAreaZX /deep/ .swiper-container{overflow-y: visible;margin-right: 50px;}
    .scrollAreaZX /deep/ .swiper-button-prev{left: 0px;background-color: rgba(62,216,196,1);width: 60px;height: 60px;background-image:url("../../static/img/swiper-left.png");}
    .scrollAreaZX /deep/ .swiper-button-next{right: 0; background-color: rgba(62,216,196,1);width: 60px;height: 60px;background-image:url("../../static/img/swiper-right.png");}
    @media screen and (max-width: 1366px) {
        .scrollAreaZX /deep/ .swiper-button-next{right: 115px;}
    }
    @media screen and (max-width: 1280px) {
        .scrollAreaZX /deep/ .swiper-button-next{right: 125px;}
    }

    .scrollAreaZX /deep/ .swiper-button-prev.swiper-button-disabled,.scrollAreaZX /deep/ .swiper-button-next.swiper-button-disabled{opacity: 0;}

    .scrollActionMain{padding: 120px 0 0 50px;}
    .InformationOne{width: 375px;height: 540px;float: left;margin:0 25px 0 0;}
    .InformationOne .imgZX{width: 375px;height: 230px;background-color: #f7f7f7;}
    .InformationOne .userInfoTime{font-size: 14px;color:rgba(136,136,136,1);height: 22px;line-height: 22px;margin: 42px 0 22px;}
    .InformationOne .userInfoTime .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;}
    .InformationOne .userInfoTime .name{}
    .InformationOne .userInfoTime .time{}
    .InformationOne .title{font-size: 18px;color: rgba(34,34,34,1);line-height: 26px;height: 26px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .InformationOne .intro{font-size: 14px;color:rgba(102,102,102,1);line-height: 24px;height: 48px;max-height: 48px;margin: 22px 0 50px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }


    /*关于我们*/
    .aboutUsArea{height: 810px;background:rgba(72,197,181,1);position: relative;}
    .aboutUsAreaMain {width: 1000px;margin:0 auto ;padding-top: 96px;}
    .aboutUsAreaMain .topArea{position: relative;margin-bottom: 20px;}
    .aboutUsAreaMain .topArea .title{font-size: 34px;color:#fff;line-height: 36px;}
    .aboutUsAreaMain .topArea .intro{font-size: 16px;color:#fff;line-height: 36px;margin-top: 10px;}
    .usMain{position: relative;height: 620px;}
    .usMain .leftArea{width: 400px;float: left;}
    .usMain .leftArea .oneHistory{position: relative;width: 345px;height: auto;overflow: hidden;float: left;margin-right: 50px;}
    .usMain .leftArea .oneHistory.margR{margin-right: 0;}
    .usMain .leftArea .oneHistory .left{padding-left: 57px;padding-top: 40px;position: relative;}
    .usMain .leftArea .oneHistory .left .verticalLine{width:2px;height:100px;background:#fff;position: absolute;top:45px;left: 0;}
    .usMain .leftArea .oneHistory .left .verticalLine .wordNum{font-size:16px;color:#fff;padding-left: 8px;}
    .usMain .leftArea .oneHistory .left .title{font-size: 20px;color: #fff;margin-bottom: 18px;font-weight: 600;}
    .usMain .leftArea .oneHistory .left .introduction{font-size: 14px;color: #fff;line-height:26px;}
    .usMain .leftArea .understandMoreUs{display: block; width: 140px;height: 40px;line-height: 40px;border: 1px solid #fff;color:#fff;text-align: center;position: absolute;left: 58px;bottom: 116px;}
    .aboutUsArea .rightArea{width: 960px;height: 690px;position: absolute;right: 0;top: 240px;}
    /*@media only screen and (max-width: 1366px) {*/
    /*.aboutUsArea .rightArea{width: 672px;height: 483px;}*/
    /*}*/
    /*合作伙伴*/
    .ourPartner{height: 738px;}
    .ourPartnerMain{width: 1000px;margin:0 auto ;padding-top: 136px;}
    .ourPartnerMain .topArea{position: relative;margin-bottom: 50px;}
    .ourPartnerMain .topArea .title{font-size: 34px;color:rgba(34,34,34,1);line-height: 36px;}
    .ourPartnerMain .topArea .intro{font-size: 16px;color:rgba(102,102,102,1);line-height: 36px;margin-top: 10px;}
    /*logo轮播*/
    .scrollLogoArea{position: relative;width: 1000px;height: auto;overflow: hidden;margin: 100px auto;}
    .scrollLogoArea .logoPartner{width: 190px;height: 80px;float: left;padding: 18px;position: relative;}
    .scrollLogoArea .logoPartner .rightLine{width:2px;height: 90px;position: absolute;right: 0;top:12px;background:rgba(238,238,238,1);}
    .scrollLogoArea .logoPartner .bottomLine{width: 200px;height: 2px;position: absolute;left: 11px;bottom: 0;background:rgba(238,238,238,1);}
    .scrollLogoArea /deep/ .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets{position: absolute; left: 940px;top:102px; width: 60px;height:30px;}
    .scrollLogoArea /deep/ .swiper-pagination-bullet{width: 8px;height: 8px;}
    .scrollLogoArea /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active{background:rgba(62,216,196,1);}


</style>
