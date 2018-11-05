<template>
    <div class="graphicInformation"  @click="open=false" v-title data-title="图文资讯">
        <div class="topBarArea">
            <router-link to="/indexPage">
                <img src="static/img/logo.png" alt="" class="logo">
            </router-link>
        </div>

        <rightBar></rightBar>

        <div class="topBanner">
            <div class="bgGray"></div>
            <div class="bannerAreaMain">
                <img src="static/img/banner5.png">
                <img src="static/img/bannerdescription5.png" alt="" class="bannerdescription graphicInformationLeft">
            </div>
        </div>
        <div class="graphicInformation">

            <div class="proNameArea">
                <div class="proNameLeft"  v-if="themeLabelsTitle.length">
                    <span v-for= "(item,index) in themeLabelsTitle"
                          :key = "'themeLabelsTitle'+ item.themeLabelId"
                          @click="changeType(item.themeLabelId)"
                          :class="{ active: item.themeLabelId == askData.themeLabelId }">
                        {{item.themeLabelName}}</span>
                </div>
                <div class="proChooseRight marginR">
                    <div class="chooseValue" @click.stop="open = !open" >{{vals}}<img src="static/img/singledown.png" alt="" class="singleDown"></div>
                    <div class="selectOne" v-show="open">
                        <p class="nowNew"  @click="nowNewClick" ><img src="static/img/select1.png" alt="">{{nowNew}} </p>
                        <p class="nowMostComments"  @click="nowMostCommentsClick"><img src="static/img/select2.png" alt="">{{nowMostComments}}</p>
                    </div>
                </div>
            </div>

            <div class="graphicList">
                <ul>
                    <li  v-for="(item,index) in themesByLabelList" :key = "(item,index)">
                        <router-link :to="{path:'/graphicInformationDetail',query:{themeId:item.themeId}}"  tag="a" target="_blank">
                            <div class="graphicItem">
                                <div class="left">
                                    <img :src="item.themeImage" alt="">
                                </div>
                                <div class="right">
                                    <div class="userInfoTime">
                                        <img :src="item.sourceLogo" alt="" class="userLOGO">
                                        <span  class="name">{{item.sourceName}}</span>
                                        <i class="circle">.</i>
                                        <span  class="time">{{item.datetime | formatTime11}}</span>
                                        <span class="technologyLabel">{{item.themeTag}}</span>
                                    </div>
                                    <h2 class="title">{{item.themeTitle }}</h2>
                                    <p class="intro">{{item.themeDesc}}</p>
                                    <div class="readAll">
                                        <div class="left"><router-link to="" class="readMore">READ MORE  ></router-link></div>
                                        <div class="right">
                                            <span class="zan"><img src="static/img/zan.png" alt="" class="marginTop">{{item.praiseCount}}</span>
                                            <span class="zan comment"><img src="static/img/comment.png" alt="">{{item.themeCommentCount }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>

                </ul>
                <a href="javascript:;" class="loadMoreList" v-show="more" @click="moreClick">加载更多</a>
                <a href="javascript:;" class="loadMoreList" v-show="!more">没有更多了</a>
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
    export default {
        name: 'graphicInformation',
        components: {
            rightBar,
            rightScrollTop,
            footerBar
        },
        data () {
            return {
                open:false,
                vals:'最新发布',
                nowNew:'最新发布',
                nowMostComments:'评论最多',

                more:true,//加载更多产品

                askData:{
                    themeLabelId :0,
                    pageSize:8,
                    pageNumber:1,
                    orderBy:1
                },
                themeLabelsTitle:[],//产品标题
                themesByLabelList:[],//产品列表
                themeId:'',
            }
        },
        mounted(){
            var that = this;
            network(CONFIG.themeLabels,{token:'dGFud3VhcHBBUEkxNTM1NDI3NTU3NTk3NHBqdGEx'},{method:'GET'}).then((res) => {//获取列表标题
                that.themeLabelsTitle = res.details.list
            });
            that.getData();//获取专题图文资讯列表数据

        },
        methods:{
            nowNewClick(){//下拉最新
                this.vals = this.nowNew;
                this.open=false;
                this.changeOrderBy(1)
            },
            nowMostCommentsClick(){//下拉评论最多
                this.vals = this.nowMostComments;
                this.open=false;
                this.changeOrderBy(2)
            },
            initData(){
                var that = this;
                that.askData.pageNumber = 1;
                that.more = true;
                that.themesByLabelList = [];
                that.getData();
            },
            getData(){
                var that = this;
                if (!that.more) {
                    return false;
                };
                network(CONFIG.themesByLabel,{
                    pageNumber:that.askData.pageNumber,
                    pageSize:that.askData.pageSize,
                    labelId:that.askData.themeLabelId,
                    orderBy:that.askData.orderBy
                },{method:'GET'}).then((res) => {
                    that.themesByLabelList =  that.themesByLabelList.concat(res.data);
                    that.askData.pageNumber++;
                    that.loadingMoreBtn =  that.askData.pageNumber <= res.page.pages;
                });
            },
            moreClick(){//加载更多
                var that = this;
                that.getData();
            },
            changeType(id){
                var that = this;
                that.askData.themeLabelId = id;
                that.initData();
            },
            changeOrderBy(type){
                var that = this;
                that.askData.orderBy = type;
                that.initData();
            },


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .graphicInformation{background-color:#F6F6F6;}

    .graphicList{width: 1300px; margin: 0 auto;clear: both;overflow: hidden;}
    .graphicList ul {width: 1280px;padding:0 10px; margin: 0 auto;}
    .graphicList ul li{margin-bottom: 30px;background-color: #fff;}
    .graphicList ul li:hover{box-shadow: 0 0 10px #dedede;}
    .graphicList ul li .graphicItem{height: auto;overflow: hidden;}
    .graphicList ul li .graphicItem .left,.graphicList ul li .graphicItem .left img{width: 630px;height: 320px;float: left;}
    .graphicList ul li .graphicItem .right{width: 600px;float: right;padding-right: 20px;}
    .graphicItem .right .userInfoTime{font-size: 14px;color:rgba(136,136,136,1);height: 24px;line-height: 24px;margin: 42px 0 22px;}
    .graphicItem .right .userInfoTime .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;float: left;}
    .graphicItem .right .userInfoTime .name{}
    .graphicItem .right .userInfoTime .time{}
    .graphicItem .right .userInfoTime .technologyLabel{display: inline-block;font-size: 12px;color:rgba(255,255,255,1);background:rgba(62,216,196,1);margin-left: 23px;line-height: 24px;padding: 0 13px;}
    .graphicItem .right .title{font-size: 22px;color:rgba(34,34,34,1);line-height: 34px;height: 34px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 20px;}
    .graphicItem .right .intro{font-size: 14px;color:rgba(68,68,68,1);line-height: 24px;height: 48px;overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;}
    .graphicItem .right .readAll{height: auto;overflow: hidden;margin-top: 75px;}
    .graphicItem .right .readAll .left{width: 200px;float: left;height: auto;}
    /*.graphicItem .right .readAll .left .readMore{display: inline-block;height: 26px;line-height: 26px;border-bottom: 2px solid rgba(170,170,170,1); font-size: 14px;color:rgba(170,170,170,1);}*/
    /*.graphicItem .right .readAll .left .readMore:hover{display: inline-block;height: 26px;line-height: 26px;border-bottom: 2px solid rgba(62,216,196,1); font-size: 14px;color:rgba(62,216,196,1);}*/
    .readMore{display: inline-block;height: 26px;line-height: 26px;border-bottom: 2px solid rgba(170,170,170,1); font-size: 14px;color:rgba(170,170,170,1);position: relative;}
    .readMore:before {position: absolute;content: '';border-top: 3px solid #000;z-index: 1;width: 0;top: 30px;left: 0;}
    .readMore:after {position: absolute;width: 0%;content: '';border-top: 3px solid #3ED8C4;top: 26px;left: 0;}
    .readMore:hover{color:rgba(62,216,196,1);}
    .readMore:hover:after {width: 100%;
        transition:width 0.4s;
        -moz-transition:width 0.4s; /* Firefox 4 */
        -webkit-transition:width 0.4s; /* Safari and Chrome */
        -o-transition:width 0.4s; /* Opera */
        transition-timing-function: linear;
    }

    .graphicItem .right .readAll .right{width:130px;float: right;padding-right: 0;color: rgba(136,136,136,1);}
    .graphicItem .right .readAll .right .zan{}
    .graphicItem .right .readAll .right .zan img{display: inline-block;width: 15px;height: 15px;vertical-align: middle;margin-right: 5px;}
    .graphicItem .right .readAll .right .zan.comment{margin-left: 8px;}

</style>
