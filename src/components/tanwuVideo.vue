<template>
  <div class="tanwuVideo" @click="open=false"  v-title data-title="探物视频">
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="topBanner">
          <div class="bgGray"></div>
          <div class="bannerAreaMain">
              <img src="static/img/banner6.png">
              <img src="static/img/bannerdescription6.png" alt="" class="bannerdescription tanwuVideoLeft">
          </div>
      </div>

      <div class="tanwuVideoAll">
          <div class="proNameArea">
              <div class="proNameLeft">
                  <span :class="{active:askData.videoTypeId == item.videoTypeId}" v-for="(item,index) in types" @click="changeType(item.videoTypeId)">#{{item.videoTypeName}}</span>
              </div>
              <div class="proChooseRight">
                  <div class="chooseValue" @click.stop="open = !open" >{{vals}}<img src="static/img/singledown.png" alt="" class="singleDown"></div>
                  <div class="selectOne" v-show="open">
                      <p class="nowNew"  @click="nowNewClick" ><img src="static/img/select1.png" alt="">{{nowNew}} </p>
                      <p class="nowMostComments"  @click="nowMostCommentsClick"><img src="static/img/select2.png" alt="">{{nowMostComments}}</p>
                  </div>
              </div>
          </div>

          <div class="tanwuVideoList">
            <ul>
                <!--<li  v-for = "(item,index) in listData" :key = "index" @click="goDetails(item.videoId)">-->
                <li  v-for = "(item,index) in listData" :key = "index">
                    <router-link :to="{path:'/tanwuVideoDetail',query:{videoId:item.videoId}}"  tag="a" target="_blank">
                    <div class="videoArea" :style="{'background-image':'url('+item.background+')'}"></div>
                    <div class="introVideo">
                        <h2 class="title">{{item.title}}</h2>
                        <div class="userInfoTime">
                            <div class="left">
                                <img :src="item.sourceLogo" alt="" class="userLOGO">
                                <span  class="name">{{item.sourceName}}</span>
                                <i class="circle">.</i>
                                <span  class="time">{{item.datetime | formatTime11}}</span>
                                <span class="labelTip">{{item.videoType}}</span>
                            </div>
                            <div class="right">
                                <span class="zan"><img src="static/img/zan.png" alt="" class="marginTop">{{item.praiseCount}}</span>
                                <span class="zan comment"><img src="static/img/comment.png" alt="">{{item.commentCount}}</span>
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
  name: 'tanwuVideo',
    components: {
        rightBar,
        rightScrollTop,
        footerBar
    },
  data () {
    return {
    		types:[],
        open:false,
        vals:'最新发布',
        nowNew:'最新发布',
        nowMostComments:'评论最多',
        askData:{
            videoTypeId :0,
            pageSize:8,
            pageNumber:1,
			orderBy:1
        },
        switchShow:false,
        more:true,
        listData:[],

    }
  },
    mounted(){
        var that = this;
        network(CONFIG.videoTypes,{},{method:'GET'}).then((res) => {
           that.types = res.details.list;
        });
        that.getData();
    },
    methods:{
        nowNewClick(){
            this.vals = this.nowNew;
            this.open=false;
            this.changeOrderBy(1)
        },
        nowMostCommentsClick(){
            this.vals = this.nowMostComments;
            this.open=false;
            this.changeOrderBy(2)
        },
        initData(){
        		var that = this;
        		that.askData.pageNumber = 1;
        		that.switchShow = false;
        		that.more = true;
        		that.listData = [];
        		that.getData();
        },
        getData(){
            var that = this;
            if (!that.more || that.switchShow) {
                return false;
            };
            that.switchShow = true;
            network(CONFIG.videosByType,that.askData,{method:'GET'}).then((res) => {
                that.listData = that.listData.concat(res.data);
                that.askData.pageNumber++;
                that.more =  that.askData.pageNumber <= res.page.pages;
                that.switchShow = false;
            });
        },
        moreClick(){//加载更多
            var that = this;
            that.getData();
        },
        changeType(id){
        		var that = this;
        		that.askData.videoTypeId = id;
        		that.initData();
        },
        changeOrderBy(type){
        		var that = this;
        		that.askData.orderBy = type;
        		that.initData();
        },
        /*goDetails(id){
        		var that = this;
        		that.$router.push({path: '/tanwuVideoDetail',query: {videoId:id}});
        }*/
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tanwuVideo{background-color:#F6F6F6}


.tanwuVideoAll .proNameArea{width: 1200px;}

.tanwuVideoList{width: 1260px;margin: 0 auto;padding: 0 0 80px;clear: both;}
.tanwuVideoList ul{padding: 10px;width: 1400px;overflow: hidden;}
.tanwuVideoList ul li{width: 570px;float: left;margin-right: 80px;margin-bottom: 80px; background-color: #fff;}
.tanwuVideoList ul li .videoArea{ width:570px;height:330px; background-repeat: no-repeat;background-position: center;background-size: cover;position: relative;}
.tanwuVideoList ul li .videoArea:after {
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
.tanwuVideoList ul li .videoArea:hover:after {opacity: 1;}
.tanwuVideoList ul li .VideoIcon{position: absolute;
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

.tanwuVideoList ul li .introVideo{padding:0 20px}
.tanwuVideoList ul li:hover{box-shadow: 0 0 10px #dedede;}
.introVideo .title{font-size: 16px;color: rgba(34,34,34,1);height: 18px;line-height: 18px;margin: 20px 0 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.introVideo .userInfoTime{font-size: 14px;color: rgba(136,136,136,1);height: 24px;line-height: 24px;padding: 0px 0 20px;}

.introVideo .userInfoTime .left{width: 380px;float: left;}
.introVideo .userInfoTime .left .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;}
.introVideo .userInfoTime .left .name{display: inline-block;max-width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-bottom: 0;}
.introVideo .userInfoTime .left .time{}
.introVideo .userInfoTime .left .labelTip{display: inline-block;font-size: 12px;color: rgba(255,255,255,1);background: rgba(62,216,196,1);padding: 0 13px;margin-left: 8px;}
.introVideo .userInfoTime .right{    width: 150px;float: right;text-align: right;}
.introVideo .userInfoTime .right .zan{}
.introVideo .userInfoTime .right .zan img{display: inline-block;width: 15px;height: 15px;vertical-align: middle;margin-right: 5px;}
.introVideo .userInfoTime .right .zan.comment{margin-left: 16px;}
</style>
