<template>
  <div class="tanwuVideoDetail"  v-title data-title="视频详情">
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="tanwuVideoDetailArea">
          <div class="videoDetailArea">

              <div class="videoPlayArea">
                  <div class="videoImg" v-if="!playFlag" @click = "playFlag = true"  :style="{'background-image':'url('+mainData.background+')'}" onclick="document.getElementById('video').play()"><i class="VideoIcon"></i></div>
                  <video :src="mainData.link" id="video" controls="controls" class="videoOkPlay">
                      当前浏览器不支持 video直接播放,请升级
                  </video>
              </div>


              <div class="introAreaVideo">
                  <h2 class="name">{{mainData.title}}</h2>
                  <div class="topNameArea">
                      <div class="userInfoTime">
                          <img :src="mainData.sourceLogo" alt="" class="userLOGO">
                          <span  class="name">{{mainData.sourceName}}</span>
                          <i class="circle">.</i>
                          <span  class="time">{{mainData.datetime | formatTime11}}</span>
                          <span class="technologyLabel">{{mainData.videoType}}</span>
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
                  <p class="intro">{{mainData.desc}}</p>
              </div>
          </div>

          <div class="praiseArea VideopraiseArea">
              <a href="javascript:;" class="praiseLove" :class="{active:mainData.is_praise === 'Y'}" @click="praiseLove" ></a>
              <p class="praisePeople">{{mainData.praiseCount}} 人已赞</p>
              <div class="userHeader">
                  <p class="praisePeopleHeadImg">
                      <img  v-for="item in mainData.praiseHeadImgs" :src="item" alt="">
                  </p>
                  <span class="ellipsis" v-show="mainData.praiseHeadImgs.length>=8">...</span>
              </div>
          </div>

          <div class="commentWriteAre VideoDetailComment">
              <!--未登录-->
              <div class="userWriteArea" v-show="userWriteAreaNoLogin">
                  <div class="left">
                      <img src="static/img/login2.png" alt="">
                  </div>
                  <textarea class="noCommenet" readonly>请先登录/注册再评论～</textarea>
                  <a href="javascript:;" class="loginCommentBtn"  @click="LoginShow=true">登录</a>
              </div>
              <!--已登录-->
              <div class="userWriteArea" v-show="userWriteAreaLogin">
                  <div class="left">
                      <!--登陆已经编辑过图像-->
                      <img :src="selfInfo.headImg" alt=""  class="alreadyLogin" v-if="selfInfo.uuid">
                  </div>
                  <textarea name="" id="" cols="30" rows="3" class="center" v-model="commentContent" placeholder="趁没人，快来抢个沙发吧～"></textarea>
                  <a href="javascript:;" class="loginCommentBtn"  @click="comment">评论</a>
              </div>
              <!--评论列表-->
              <div class="userCommentArea">
                  <h2 class="newComments">最新评论 <span>（已有{{mainData.commentCount}}条评论）</span></h2>
                  <div class="userCommentsList">
                      <ul>
                          <li v-for="(item,index) in listData">
                              <div class="commentsOne">
                                  <img v-if="item.replyCommentId" :src="item.replyHeadThumb" alt="" class="userHeadImg">
                                  <img v-else :src="item.headThumb" alt="" class="userHeadImg">
                                  <p class="praise" :class="{active:item.isPraise == 'Y'}" @click="praise(item)" > <span>{{item.praiseCount}}</span></p>
                                  <p class="comment"  @click="userWriteAreaTwoShow(item,index)">回复</p>
                                  <div v-if="item.replyCommentId" class="userWordArea">
                                      <p class="NameTimeArea">
                                          <span  class="name">{{item.replyNickname}}</span>
                                          <i class="circle">.</i>
                                          <span  class="time">{{item.replyTimestamp | formatTime11}}</span>
                                      </p>
                                      <p class="wordInfo">
                                        {{item.replyContent}}
                                      </p>
                                  </div>
                                  <div v-else class="userWordArea">
                                      <p class="NameTimeArea">
                                          <span  class="name">{{item.nickname}}</span>
                                          <i class="circle">.</i>
                                          <span  class="time">{{item.timestamp | formatTime11}}</span>
                                      </p>
                                      <p class="wordInfo">
                                        {{item.content}}
                                      </p>
                                  </div>
                              </div>
                              <!--点回复出现二级回复框-->
                              <div class="userWriteAreaTwoVideo" v-show="userWriteAreaTwo==index">
                                  <textarea name="" id="" cols="30" rows="3" class="textareaTwo" v-model="commentContentTwo" ></textarea>
                                  <a href="javascript:;" class="loginCommentBtn" @click="commentTwo">评论</a>
                              </div>

                              <div v-if="item.replyCommentId" class="commentsTwo">
                                  <img :src="item.headThumb" alt="" class="userHeadImg">
                                  <div class="userWordArea">
                                      <p class="NameTimeArea">
                                          <span  class="name">{{item.nickname}}</span>
                                          <i class="circle">.</i>
                                          <span  class="time">{{item.timestamp | formatTime11}}</span>
                                      </p>
                                      <p class="wordInfo">
                                            {{item.content}}
                                      </p>
                                  </div>
                              </div>
                          </li>
                      </ul>
                      <a href="javascript:;" class="loadMoreList" @click="getData">{{more?'加载更多':'没有更多了'}}</a>
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
import Vue from 'vue'
import { CONFIG } from  '../assets/js/config';
import { network } from '../assets/js/network';
import rightBar from './rightBar'
import footerBar from './footerBar'
import Login from './Login'
export default {
  name: 'tanwuVideoDetail',
    components: {
        rightBar,
        footerBar,
        Login
    },
  data () {
    return {
        playFlag:false,//视频背景显示隐藏
    		mainData:{
    			praiseHeadImgs:[]
    		},
		askData:{
			videoId:'',
			pageNumber:1,
			pageSize:5
		},
		switchShow:false,
        more:true,
		listData:[],
		commentContent:'',
        commentContentTwo:'',//二级评论内容
        userWriteAreaTwo:-1,//二级评论框
        replyItem: null,//二级
        replyCommentId:'',//回复id

        LoginShow: false,//登录框默认false

        userWriteAreaNoLogin:true,//未登录评论框显示
        userWriteAreaLogin:true,//已登录评论框显示

        selfInfo: "",//回复评论框头像信息

        baidu:{
            bdText : '',
            bdDesc : '',
            bdUrl : '',
            bdPic : '',
        }

    }
  },
    created(){
        if(!localStorage.getItem("twUser")) {
            this.userWriteAreaNoLogin=true;
            this.userWriteAreaLogin=false;
        }else{
            this.userWriteAreaNoLogin=false;
            this.userWriteAreaLogin=true;
        }
    },
    mounted(){
		this.askData.videoId=this.$route.query.videoId;
		this.getData();

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
        getData(){
        		var that = this;
        		if(!that.mainData.title){
        			network(CONFIG.videoDetail,that.askData,{method:'GET'}).then((res) => {
	                that.mainData = res.details;

                    that.baidu.bdText=res.details.title;
	            });
        		}
        		if (!that.more || that.switchShow) {
                return false;
            };
            that.switchShow = true;
        		network(CONFIG.videoComments,that.askData,{method:'GET'}).then((res) => {
                that.listData = that.listData.concat(res.data);
                that.askData.pageNumber++;
                that.more =  that.askData.pageNumber <= res.page.pages;
                that.switchShow = false;
                that.mainData.commentCount =  res.page.total;
            });
        },
        comment(id){
        		var that = this;
        		if(!that.commentContent.trim()){
                    Vue.toast('评论内容不能为空', {duration: 1500});
        			return false;
        		}
        		var askData = {
        			videoId:that.askData.videoId,
				    content: that.commentContent
			};
        		network(CONFIG.videoCommentRelease, askData).then((res) => {
				    that.commentContent = "";
				    that.askData.pageNumber = 1;
	        		that.switchShow = false;
	        		that.more = true;
	        		that.listData = [];
                    that.userWriteAreaTwo=-1;
				    that.getData();
			});

        },
        //心点赞
        praiseLove() {
            var that = this
            network(CONFIG.videoPraise, {
                videoId: that.askData.videoId,
                praiseState : that.mainData.is_praise === 'Y' ? "false" : "true",
            }).then((res) => {
                if(!localStorage.getItem("twUser")) {
                    that.LoginShow = true;
                }else if(res.head.code == 0){
                 that.mainData.is_praise = (res.details.praiseState === true) ? "Y" : "N";
                 that.mainData.praiseCount = res.details.praiseCount;
                 that.mainData.praiseHeadImgs = res.details.praiseHeadImgs;
                }
            })
        },
        closeLogin(){//关闭登录
            this.LoginShow = false;
        },
        //评论点赞
        praise(item) {
            var that = this;
            var askData = {
                commentId: item.commentId,
                flag: item.isPraise == 'Y' ? 'N' : 'Y'
            };
            network(CONFIG.videoCommentPraise, askData).then((res) => {
                if(!localStorage.getItem("twUser")) {
                    that.LoginShow = true;
                }else if(res.head.code == 0){
                item.isPraise = item.isPraise == 'Y' ? 'N' : 'Y';
                item.praiseCount = item.isPraise == 'Y' ? item.praiseCount + 1 : item.praiseCount - 1;
                }
            });
        },
        userWriteAreaTwoShow(item,index){//获取当前回复框的对应值索引
            var that = this;
            if(!localStorage.getItem("twUser")) {
                that.LoginShow = true;
            }else {
                that.userWriteAreaTwo=index;
                that.replyCommentId=item.commentId;
                that.commentContentTwo='';
            }

        },
        commentTwo(id) {//二级评论
            var that = this;
            if(!that.commentContentTwo.trim()){
                Vue.toast('评论内容不能为空', {duration: 1500});
                return false;
            }
            var askData = {
                videoId:that.askData.videoId,
                replyCommentId:that.replyCommentId,
                content: that.commentContentTwo
            };
            network(CONFIG.videoCommentRelease, askData).then((res) => {
                that.commentContentTwo = "";
                that.askData.pageNumber = 1;
                that.switchShow = false;
                that.more = true;
                that.listData = [];
                that.getData();
                this.userWriteAreaTwo=-1;
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tanwuVideoDetail{background-color:#FAFAFA; padding-bottom: 15px;}

.tanwuVideoDetailArea{background-color: #fff;width:1120px;margin: 0 auto;}
.videoPlayArea{position: relative;}
.videoDetailArea{width: 1120px;margin:0  auto;}
.videoDetailArea .videoImg{width: 1120px;height: 584px;background-size: cover;position: absolute;top:0;left: 0;z-index: 2;}
.videoDetailArea .videoImg:after {
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
.videoDetailArea .videoImg:hover:after {opacity: 1;}
.videoDetailArea  .videoImg  .VideoIcon{position: absolute;
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
.videoDetailArea  .videoOkPlay{width: 1120px;height: 584px;}

.introAreaVideo{padding: 0 50px;}
.videoDetailArea .name{font-size: 18px; color:rgba(34,34,34,1);line-height: 30px;margin: 30px 0 6px;}
.videoDetailArea .topNameArea{height: 60px;}
.videoDetailArea .userInfoTime{font-size: 14px;color:rgba(136,136,136,1);height: 24px;line-height: 24px;width:600px;float: left;}
.videoDetailArea .userInfoTime .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;}
.videoDetailArea .userInfoTime .name{}
.videoDetailArea .userInfoTime .time{}
.videoDetailArea .userInfoTime .technologyLabel{display: inline-block;font-size: 12px;color:rgba(255,255,255,1);background:rgba(62,216,196,1);margin-left: 23px;line-height: 24px;padding: 0 13px;}
.videoDetailArea .intro{font-size: 14px;color:rgba(34,34,34,1);line-height: 24px;margin:0 0 70px;}

/*分享区域*/
.topNameArea .threeWatch{width: 170px;float: right;position: relative;text-align: right;}
.topNameArea .threeWatch .shareName{width: 40px;float: left; font-size: 12px;color:#222;line-height: 36px;}
.topNameArea .threeWatch .watchOne{display: inline-block;width:36px;height:36px;background:rgba(180,180,180,1);}
.topNameArea .threeWatch .watchOne a{padding-left: 0;}
.topNameArea .threeWatch .watchOne .bds_weixin.imgLinkIcon{width:36px;height:36px;margin: 0px;background: url("../../static/img/watch1.png") center;display: inline-block;}
.topNameArea .threeWatch .watchOne .bds_mshare.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch4.png") center;display: inline-block;}
.topNameArea .threeWatch .watchOne .bds_tsina.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch2.png") center;display: inline-block;}

.topNameArea .threeWatch .watchOne:hover{background:rgba(62,216,196,1);}
.topNameArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight h2{font-size: 14px;color: rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
.topNameArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight p{font-size: 12px;color: rgba(34,34,34,1);line-height: 26px;}


/*评论    */

.commentWriteAre.VideoDetailComment{width: 1100px;margin: 0 auto;padding: 50px 0px 70px 0;}
/*.commentWriteAre.VideoDetailComment .userWriteArea{background-color: #1C1C1C;width: 1100px;}
.commentWriteAre.VideoDetailComment .wordInfo{color:#999999}
.commentWriteAre.VideoDetailComment .userWriteArea .center{width: 750px;}
.praiseArea.VideopraiseArea .praisePeople{color:rgba(255,255,255,.6);}
.commentWriteAre.VideoDetailComment .noCommenet{color: #666;background-color: #1C1C1C;}
.commentWriteAre.VideoDetailComment  .userCommentArea .newComments{color: #fff;}
.commentWriteAre.VideoDetailComment .userCommentsList ul li{border-bottom: 1px solid #2E2E2E;}
.commentWriteAre.VideoDetailComment .loadMoreList{color:rgba(255,255,255,1);border: 1px solid rgba(255,255,255,.1);}*/

.commentWriteAre.VideoDetailComment .noCommenet {}

/*二级评论框*/
.userWriteAreaTwoVideo{background-color: #1C1C1C;width: 1040px;height: 114px;margin-bottom: 20px;margin-left: 55px;}
.userWriteAreaTwoVideo .textareaTwo{width: 830px;height: 69px;padding: 0 20px;float: left;font-size: 14px;color: rgba(102,102,102,1);line-height: 22px;margin-top: 20px;background:none;border: none; }
.userWriteAreaTwoVideo .loginCommentBtn{display: block;width:100px;height:40px;line-height: 40px;background:rgba(62,216,196,1);color: #fff;text-align: center;float: right;margin: 50px;margin: 36px 30px 0 0;}

</style>
