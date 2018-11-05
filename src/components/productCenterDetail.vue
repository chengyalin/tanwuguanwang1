<template>
    <div class="productCenterDetail" v-title data-title="产品详情" v-show="showDetail">
        <div class="topBarArea">
            <router-link to="/indexPage">
                <img src="static/img/logo.png" alt="" class="logo">
            </router-link>
        </div>

        <rightBar></rightBar>

        <div class="proCenterDetailMain">
            <div class="topInfoArea">
                <div class="left" >
                    <!-- Swiper -->
                    <swiper :options="swiperOptionDetail" ref="mySwiper">
                        <div class="swiper-slide" v-for="item in mainData.products.image_list_src">
                            <img  :src="item" alt="">
                        </div>
                        <!-- Add Pagination -->
                        <div class="swiper-pagination" slot="pagination"></div>

                    </swiper>
                </div>
                <div class="right">
                    <h2 class="title">{{mainData.products.name}}</h2>
                    <div class="starArea">
                        <div class="grayStar">
                            <span class="yellowStar" :style="{width:mainData.products.avg_score*20+'%'}"></span>
                        </div>
                        <span class="scoreStar">{{mainData.products.avg_score}}</span>
                    </div>
                    <p class="intro">{{mainData.products.description}}</p>
                    <!--<div class="conditionArea" @click="showFour=!showFour">
                        <img src="static/img/procenterDetail2.png" alt="" class="tringle">
                        <div class="condationOne" v-show="!showFour">
                            <span><img src="static/img/procenterDetail1.png" alt="">信用免押</span>
                            <span><img src="static/img/procenterDetail1.png" alt="">信用免押</span>
                            <span><img src="static/img/procenterDetail1.png" alt="">信用免押</span>
                            <span><img src="static/img/procenterDetail1.png" alt="">信用免押</span>
                        </div>
                        <div class="condationTwo" v-show="showFour">
                            <p><img src="static/img/procenterDetail1.png" alt="">芝麻信用享押金减免，花呗分期付款</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">押金48小时极速退款</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">全国四地网点均可自提、自还</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">购买意外保险免赔产品地维修费</p>
                        </div>
                    </div>-->
                    <div class="conditionArea">
                        <div class="condationTwo" v-show="!showFour">
                            <p><img src="static/img/procenterDetail1.png" alt="">芝麻信用享押金减免，花呗分期付款</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">押金48小时极速退款</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">全国四地网点均可自提、自还</p>
                            <p><img src="static/img/procenterDetail1.png" alt="">购买意外保险免赔产品地维修费</p>
                        </div>
                    </div>
                    <p class="price"><span>¥{{mainData.products.rent}}</span>/{{mainData.products.rentUnit}} (租期越长越便宜哦～）</p>
                    <div class="ticketArea">

                        <div class="ticketImmediately">
                            <a href="javascript:;" class="ticketlQ">立即领券体验</a>
                            <div class="ticketShowArea">
                                <div id="qrcode" ref="qrcode" class="ticketLeft"></div>
                                <div class="ticketRight">
                                    <h2>立即扫码</h2>
                                    <p>获取更多优惠</p>
                                </div>
                            </div>
                        </div>

                        <div class="threeWatch">
                            <div class="bdsharebuttonbox bdshare-button-style0-16">
                                <a href="#" class="bds_more" data-cmd="more" style="display: none;"></a>
                                <p class="shareName">分享</p>
                                <div class="watchOne wechatCodeShow">
                                    <a href="#" class="bds_weixin imgLinkIcon" data-cmd="weixin"></a>
                                </div>
                                <div class="watchOne"><a href="#" class="bds_mshare imgLinkIcon" data-cmd="mshare"></a></div>
                                <div class="watchOne"><a href="#" class="bds_tsina imgLinkIcon" data-cmd="tsina"></a></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="DetailInfoArea">
                <div class="tabName">
                    <a @click="tabChange(index)"  v-for="(item,index) in tabArray" :key="index" class="tabNameOne" :class="{'active': isActive === index}">
                        <span :class="{'active': isActive === index}">{{item}}</span>
                        <img src="static/img/procenterDetail3.png" alt="" class="tringle" v-if="index">
                        <img src="static/img/procenterDetail3.png" alt="" class="tringle" v-if="index===0">
                    </a>
                </div>
                <div class="tabContentArea">
                    <div class="tabContent tabOne" v-show="isActive === 0">
                        <img v-for="(item,index) in detailListImg" :key="(item,index)"  :src="item" alt="">
                    </div>
                    <div class="tabContent" v-show="isActive === 1">
                        <div class="productMouth">
                            <ul>
                                <li v-for="(item,index) in MouthlistData" :key="index">
                                    <div class="proMouthOne">
                                        <img :src="item.head_thumb" alt="" class="userHeadImg">
                                        <p class="praise" :class="{active:item.is_praise == 'Y'}" @click="praise(item,index)" >{{item.praise_count}}</p>
                                        <div class="userWordArea">
                                            <p class="NameTimeArea">
                                                <span  class="name">{{item.nickname}}</span>
                                                <i class="circle">.</i>
                                                <span  class="time">{{item.datetime | formatTime11}}</span>
                                                <span class="labelTip"  v-if="item.productAppraiseType == 'ORDER'">已体验</span>
                                            </p>
                                            <p class="wordInfo">{{item.details}}</p>
                                        </div>
                                        <div class="proMouthImgArea">
                                            <div class="MouthTabName" >
                                                <span v-for="(item1,index1) in item.image_list_src" :key="index1" :class="{'greenBorder':currentIdx == index && currentIdx1 == index1}"   @click="showToggle(index,index1)"  class="smallItem">
                                                    <img :src="item1" alt="">
                                                    <i></i>
                                                </span>
                                            </div>
                                            <div v-if="index == currentIdx" class="MouthTabContent">
                                                <img :src="item.image_list_src[currentIdx1]" alt="" class="bigItem">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <a href="javascript:;" class="loadMoreList" v-show="loadingMoreMouthBtn" @click="moreClick">加载更多</a>
                            <a href="javascript:;" class="loadMoreList" v-show="!loadingMoreMouthBtn">没有更多了</a>
                        </div>
                        <!--<div v-if="noDataFlag && !MouthlistData.length">-->
                        <!--<p>暂无任何口碑</p>-->
                        <!--</div>-->
                    </div>
                    <!--租赁规则-->
                    <div class="tabContent" v-show="isActive === 2">
                        <div class="rentRulesArea">
                            <div class="rulesQuestion"  v-for="(item,index) in leaseRules" :key="(item,index)">
                                <p class="question"><span class="questionWord">Q</span>{{ item.title }}</p>
                                <p class="answer">{{item.content}}</p>
                            </div>
                        </div>
                    </div>
                    <!--常见问题-->
                    <div class="tabContent" v-show="isActive === 3">
                        <div class="rentRulesArea">
                            <div class="rulesQuestion" v-for="(item,index) in OftenQuestion" :key="(item,index)">
                                <p class="question"><span class="questionWord">Q</span>{{ item.title }}</p>
                                <p class="answer">{{item.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--登录注册区域-->
        <Login v-show="LoginShow"  @close="closeLogin"></Login>

        <footerBar></footerBar>
    </div>
</template>

<script>
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import rightBar from './rightBar'
    import footerBar from './footerBar'
    import QRCode from 'qrcodejs2'
    import Login from './Login'
    export default {
        name: 'productCenterDetail',
        components: {
            swiper,
            swiperSlide,
            rightBar,
            footerBar,
            QRCode,
            Login,
        },
        data () {
            return {
                LoginShow: false,//登录框默认false
                // 详情板块的
                showDetail: true,//显示整个界面默认隐藏 false
                swiperOptionDetail:{//BANNER
                    loop: true,//循环
                    notNextTick: true,
                    autoplay: true, //自动轮播
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true, //修改swiper的父元素时，自动初始化swiper
                },
                showFour:false,//芝麻信用享押金减免板块
                tabArray:['产品详情','产品口碑','租赁规则','常见问题'],
                isActive: 0,//'产品详情','产品口碑','租赁规则','常见问题'的默认索引
                currentIdx:0,//产品口碑内容的索引
                currentIdx1:-1,//产品口碑内容图片数组的索引
                sites:[{img:'static/img/aboutus1.png'},{img:'static/img/aboutus2.png'},{img:'static/img/aboutus3.png'}],

                mainData: {
                    products: {},//左上角图片轮播
                    coupons: [],
                    similar_products: [],
                    videos: [],
                    product_appraise: {
                        list: []
                    },
                },

                detailListImg:[],//产品详情列表

                askDataMouth:{//产品中心详情口碑列表参数
                    size:'10',
                    start:'-1',
                    product_id:''
                },
                MouthlistData:[],//口碑列表
                loadingMoreMouthBtn:'true',//加载更多口碑评论
                switchShow:false,
                noDataFlag:false,

                leaseRules: [],//租赁规则列表
                OftenQuestion:[],//常见问题列表

                type_id:'',

                baidu:{
                    bdText : '',
                    bdDesc : '',
                    bdUrl : '',
                    bdPic : '',
                }

            }
        },
        created(){
            this.product_id=this.$route.query.product_id
            this.type_id=this.$route.query.type_id
        },
        mounted(){
            this.getProductDetail();//获取产品详情
            this.getDataMouth();//获取口碑数据列表测
            this.getDataleaseRules();//获取租赁规则数据
            this.getDataOftenQuestion()//获取常见问题数据
            /*
               @  在需要调用的地方  这样必须这样调用  否则会出现  appendChild  null  就是id为qrcode的dom获取不到 返回结果为null
           */
            this.$nextTick (function () {
                this.qrcode();
            })

        },

        updated(){
            //调用百度分享
            const _this=this;
            window._bd_share_main = "";
            setTimeout(()=>{
                _this.setup()
            },300)
        },
        methods:{
            // 百度分享
            setup(){
                window._bd_share_config={
                    "common":{
                        bdText : this.baidu.bdText,
                        bdDesc : this.baidu.bdDesc,
                        bdUrl : this.baidu.bdUrl,
                        bdPic :this.baidu.bdPic,
                    },
                    "share":{
                        "bdSize" : 16
                    },
                    "selectShare":{
                        "bdContainerClass":null,
                        "bdSelectMiniList":["weixin","mshare","tsina"]
                    }
                };
                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
                document.body.appendChild(s);
            },
            //生成产品二维码分享
            qrcode () {
                let qrcode = new QRCode('qrcode', {
                    width: 83,  // 设置宽度
                    height: 83, // 设置高度
                    text: 'https://m.tanwuapp.com/home/productDetails.html?type_id=' + this.type_id + '&product_id=' + this.product_id,
                })
            },

            tabChange (index) {
                this.isActive = index
            },

            showToggle:function(index,index1){
                // if (this.currentIdx == index) return this.currentIdx = -1;
                this.currentIdx = index;
                this.currentIdx1 = index1;

            },
            //详情页产品滚动图，介绍文字
            getProductDetail(){
                var that = this;
                network(CONFIG.product, {
                    "product_id":that.product_id,
                    //"product_id":75,
                    "client": 'web'
                }).then((res) =>{
                    console.log(res)
                    that.mainData=res.details;
                    that.mainData.products.image_list_src = that.mainData.products.image_list_src.split(",");
                    that.detailListImg=res.details.products.alimini_image_src_list;//图文详情介绍
                    that.detailListImg=that.detailListImg.split(",");

                    that.baidu.bdText=res.details.products.name;
                })
            },
            //获取口碑数据列表
            getDataMouth(){
                var that = this;
                if (!that.loadingMoreMouthBtn) {
                    return false;
                };

                network(CONFIG.appraises,{
                    size:that.askDataMouth.size,
                    start:that.askDataMouth.start,
                    product_id:that.product_id,
                    //product_id:34
                    //product_id:33
                }).then((res) => {
                    console.log(res)
                    var MouthlistDatadetails = res.details;
                    MouthlistDatadetails.forEach(function(item){
                        item.image_list_src = item.image_list_src.length?item.image_list_src.split(","):[];
                    });
                    that.MouthlistData = that.MouthlistData.concat(MouthlistDatadetails);
                    that.askDataMouth.start = res.result.start;
                    that.loadingMoreMouthBtn = res.result.more;
                });
            },
            moreClick(){//点击加载更多
                var that = this;
                that.getDataMouth();
            },
            //点赞手
            praise(item,index){
                var that = this;
                network(CONFIG.appraisePraise,{
                    product_appraise_id:item.appraise_id,
                    praise:(item.is_praise == "Y")?"N":"Y",
                    be_uuid:item.uuid,
                }).then((res) => {
                    if(!localStorage.getItem("twUser")) {
                        that.LoginShow = true;
                    }else if(res.head.code == 0){
                        item.is_praise = (res.details.flag =="1")?"Y":"N";
                        item.praise_count = res.details.count;
                    }
                });
            },
            closeLogin(){//关闭登录
                this.LoginShow = false;
            },
            getDataleaseRules () {
                var that = this;
                network(CONFIG.help, {'type': 2}).then((res) => {
                    that.leaseRules=res.details.questions;
                })
            },
            getDataOftenQuestion() {
                var that = this;
                network(CONFIG.help, {'type': 1}).then((res) => {
                    that.OftenQuestion=res.details.questions;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*详情*/
    /*.productCenterDetail{width: 100%; height: 100%; overflow-x: hidden;overflow-y: scroll; background:rgba(250,250,250,1);position: fixed;top:0;left: 0;z-index: 102;}*/

    .proCenterDetailMain{width: 1320px;height: auto;overflow: hidden;margin: 0 auto;background-color: #fff;}
    .closeDetail{display: block;width: 80px;height: 80px; position: fixed;z-index: 103;right: 20px;top:0;background-color: #3ED8C4;}
    .closeDetail img{margin: 30px;}
    .proCenterDetailMain .topInfoArea{}
    .topInfoArea .left{width: 680px;height: 544px;/*height: 680px;*/float: left;}
    .topInfoArea .left img{display: block; width: 680px;height: 544px;/*height: 680px;*/}

    .topInfoArea .left /deep/ .swiper-pagination.swiper-pagination-bullets{bottom: -5px;}
    .topInfoArea .left /deep/ .swiper-pagination-bullet {width: 100px;height: 3px;display: inline-block;border-radius: unset;background: #C8C8C8;margin: 0 2px;bottom: 0;}
    .topInfoArea .left /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active{background-color: #3ED8C4}


    .topInfoArea .right{width: 480px;float: right;padding-right: 90px;padding-top: 70px;}
    .topInfoArea .right .title{font-size: 26px;color:rgba(34,34,34,1);height: 36px;line-height: 36px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin-bottom: 4px;}

    .topInfoArea .right .starArea{color: #999999;font-size: 14px;}
    .topInfoArea .right .starArea  .grayStar{background:url(../../static/img/star-gray.png) repeat-x 0 0;width:80px;height:16px;background-size:16px;position: relative;display: inline-block;vertical-align: middle;}
    .topInfoArea .right .starArea  .yellowStar{background:url(../../static/img/star-yellow.png) repeat-x 0 0;height:16px;background-size:16px;position: absolute;top:0;left: 0;}
    .topInfoArea .right .starArea  .scoreStar{vertical-align: middle;color: #222;margin-left: 8px;}

    .topInfoArea .right .intro{font-size: 14px;color:rgba(102,102,102,1);margin-top: 10px;}
    .conditionArea{border-top: 1px solid rgba(180,180,180,1);border-bottom: 1px solid rgba(180,180,180,1);padding: 10px 0; position: relative;margin-top: 30px;}
    .conditionArea .tringle{position: absolute;top:25px;right: 10px;}
    .conditionArea .condationOne{}
    .conditionArea .condationOne span{font-size: 12px;color:rgba(68,68,68,1);margin: 0 8px; display: inline-block;line-height: 34px;}
    .conditionArea .condationOne span img,.conditionArea .condationTwo p img{margin-right: 8px;}

    .conditionArea .condationTwo{}
    .conditionArea .condationTwo p{font-size: 12px;color:rgba(68,68,68,1);margin-left: 8px;line-height: 34px;}
    .conditionArea .condationTwo p img{}

    .topInfoArea .right .price{font-size:12px;color:rgba(170,170,170,1); margin-top: 40px;margin-bottom: 80px;}
    .topInfoArea .right .price span{font-size: 30px;color:rgba(231,51,82,1);}

    .ticketArea{}
    .ticketArea .ticketImmediately{position: relative;width: 250px;float: left;}
    .ticketArea .ticketlQ{display: block; width:170px;height:54px;line-height: 54px;text-align: center;color: #fff; background:rgba(62,216,196,1);box-shadow:0px 9px 38px 0px rgba(72,197,181,0.1), 0px 4px 8px 0px rgba(72,197,181,0.25);}

    .ticketImmediately:hover .ticketShowArea{display: block;}

    .ticketShowArea{width: 210px;height: 96px;border: 1px solid #EEEEEE;position: absolute;top:70px;left: 0;display: none;background-color: #fff;}
    .ticketShowArea .ticketLeft{display: block;width: 83px;height: 83px;float: left;margin: 7px;}
    .ticketShowArea .ticketRight{width: 100px;float: right;}
    .ticketShowArea .ticketRight h2{font-size: 14px;color: rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
    .ticketShowArea .ticketRight p{font-size: 12px;color: rgba(34,34,34,1);line-height: 26px;}

    /*分享区域*/
    .ticketArea .threeWatch{width: 200px;float: right;position: relative;margin-top: 8px;}
    .ticketArea .threeWatch .shareName{width: 40px;float: left; font-size: 12px;color:rgba(34,34,34,1);line-height: 36px;}
    .ticketArea .threeWatch .watchOne{display: inline-block;width:36px;height:36px;background:rgba(180,180,180,1);}
    .ticketArea .threeWatch .watchOne a{padding-left: 0;}
    .ticketArea .threeWatch .watchOne .bds_weixin.imgLinkIcon{width:36px;height:36px;margin: 0px;background: url("../../static/img/watch1.png") center;display: inline-block;}
    .ticketArea .threeWatch .watchOne .bds_mshare.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch4.png") center;display: inline-block;}
    .ticketArea .threeWatch .watchOne .bds_tsina.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch2.png") center;display: inline-block;}
    .ticketArea .threeWatch .watchOne:hover{background:rgba(62,216,196,1);}
    .ticketArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight h2{font-size: 14px;color: rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
    .ticketArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight p{font-size: 12px;color: rgba(34,34,34,1);line-height: 26px;}


    .DetailInfoArea{width: 1140px;padding: 90px;clear: both;}
    .tabName{height: 60px;line-height: 60px;text-align: center;border-top: 1px solid rgba(180,180,180,1);;border-bottom: 1px solid rgba(180,180,180,1);padding: 0 200px;}
    .tabName .tabNameOne{width: 160px;height: 60px;float: left;}
    .tabName .tabNameOne.active{background-color: #B4B4B4;}
    .tabName span{font-size: 14px;color:rgba(34,34,34,1);}
    .tabName  .active{color: #fff;}
    .tabName .tringle{}

    .tabContentArea{}
    .tabContent{padding: 50px 0;}
    .tabContent.tabOne{width: 52%;margin: 0 auto;}
    .tabContent.tabOne img{width: 100%;}

    .rentRulesArea{}
    .rulesQuestion{}
    .rulesQuestion .question{font-size: 16px;color:rgba(34,34,34,1);}
    .rulesQuestion .question span{display: inline-block;width:24px;height:24px;line-height: 24px;color:rgba(255,255,255,1); background:rgba(180,180,180,1);text-align: center;margin-right: 17px;}
    .rulesQuestion .answer{font-size: 14px;color:rgba(102,102,102,1);padding-left: 40px;margin-top: 16px;margin-bottom: 40px;}

    /*产品口碑*/
    .productMouth{padding: 0 40px 100px;}
    .productMouth ul{}
    .productMouth ul li{padding: 30px 28px;border-bottom: 1px solid rgba(240,240,240,1);}
    .productMouth ul li .proMouthOne{position: relative;padding:0 60px;}
    .proMouthOne .userHeadImg{width: 44px;height: 44px;border-radius: 50%;position: absolute;left: 0;top:0;background-color: #999;}
    .proMouthOne .praise{position: absolute;top:0px;right: 0px;font-size: 14px;color:rgba(136,136,136,1);text-align: right;padding-left: 28px;background: url("../../static/img/proMouthZAN.png") no-repeat 0;cursor: pointer;}
    .proMouthOne .praise.active{background: url("../../static/img/proMouthZANgreen.png") no-repeat 0;}
    .proMouthOne .NameTimeArea{font-size: 12px;color:rgba(102,102,102,1);}
    .proMouthOne .NameTimeArea .name{display: inline-block;vertical-align: middle;margin-bottom: 0;}
    .proMouthOne .NameTimeArea .circle{}
    .proMouthOne .NameTimeArea .title{}
    .proMouthOne .NameTimeArea .labelTip{display: inline-block;padding: 2px 8px; color:#fff;background-color:rgba(62,216,196,1);}
    .proMouthOne  .wordInfo{font-size: 14px;color:rgba(34,34,34,1);margin: 6px 0 0px;line-height: 28px;}

    .proMouthImgArea{}
    .proMouthImgArea .MouthTabName{width: 100%;height: auto;overflow: hidden;margin-bottom: 10px;}
    .MouthTabName .smallItem{display:block;width: 130px;height: 130px;border: 2px solid #fff;float: left;margin-right: 10px;position: relative;}
    .MouthTabName .smallItem img{display:block;width: 130px;height: 130px;border: 2px solid #fff;}
    .MouthTabName .smallItem i{display:none;}
    .MouthTabName .smallItem.greenBorder i{display: block; background: url("../../static/img/selectborder.png");width: 130px;height: 130px;border: 2px solid #fff;position: absolute;top:0;left: 0;}

    .proMouthImgArea .MouthTabContent{width: 100%;}
    .MouthTabContent .bigItem{max-width: 100%;margin-left: 5px;}
</style>
