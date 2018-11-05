<template>
  <div class="graphicInformationDetail"  v-title data-title="图文资讯详情">
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="graphicInformationDetailArea">
          <div class="graphicInfMain" :style="{'background-image':'url('+graphicInformationDetailList.themeImage+')'}">

              <div class="topNameArea">
                  <h2 class="title">{{graphicInformationDetailList.themeTitle }}</h2>
                  <div class="userInfoTime">
                      <img :src="graphicInformationDetailList.sourceLogo" alt="" class="userLOGO">
                      <span  class="name">{{graphicInformationDetailList.sourceName}}</span>
                      <i class="circle">.</i>
                      <span  class="time">{{graphicInformationDetailList.datetime | formatTime11}}</span>
                      <span class="technologyLabel">{{graphicInformationDetailList.themeTag}}</span>
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

          <div class="graphicInformationDetailMain">
              <div class="introWordMain" v-html="graphicInformationDetailList.themeDetails "></div>

              <div class="praiseArea">
                  <a href="javascript:;" class="praiseLove" :class="{active:graphicInformationDetailList.is_praise === 'Y'}" @click="praise" ></a>
                  <p class="praisePeople">{{graphicInformationDetailList.praiseCount}} 人已赞</p>
                  <div class="userHeader">
                      <p class="praisePeopleHeadImg">
                          <img  v-for="item in graphicInformationDetailListPraiseImg" :src="item" alt="">
                      </p>
                      <span class="ellipsis" v-show="graphicInformationDetailListPraiseImg.length>=8">...</span>
                  </div>
              </div>

              <div class="commentWriteAre">
                  <!--未登录-->
                  <div class="userWriteArea" v-show="userWriteAreaNoLogin">
                      <div class="left">
                          <img src="static/img/login2.png" alt="">
                      </div>
                      <textarea class="noCommenet" readonly>请先登录/注册再评论～</textarea>
                      <a href="javascript:;" class="loginCommentBtn">登录</a>
                  </div>
                  <!--已登录-->
                  <div class="userWriteArea" v-show="userWriteAreaLogin">
                      <div class="left">
                          <!--登陆已经编辑过图像-->
                          <img :src="selfInfo.headImg" alt=""  class="alreadyLogin" v-if="selfInfo.uuid">
                      </div>
                      <textarea name="" id="" cols="30" rows="3" class="center" v-model="commentContent" placeholder="快来抢个沙发吧～"></textarea>
                      <a href="javascript:;" class="loginCommentBtn" @click="comment">评论</a>
                  </div>
                  <!--评论列表-->
                  <div class="userCommentArea">
                      <h2 class="newComments">最新评论 <span>（已有{{commentsTotal}}条评论）</span></h2>
                      <div class="userCommentsList">
                          <ul>
                              <li v-for="(item,index) in listData" :key="index">
                                  <div class="commentsOne">
                                      <img v-if="item.replyCommentId" :src="item.replyHeadThumb" alt="" class="userHeadImg">
                                      <img v-else :src="item.headThumb" alt="" class="userHeadImg">
                                      <p class="praise" :class="{active:item.praise}"  @click="praiseComments(index)" ><span>{{item.praiseCount}}</span></p>
                                      <p class="comment" @click="userWriteAreaTwoShow(item,index)">回复</p>
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
                                  <div class="userWriteAreaTwo" v-show="userWriteAreaTwo==index">
                                      <textarea name="" id="" cols="30" rows="3" class="textareaTwo" v-model="commentContentTwo"></textarea>
                                      <a href="javascript:;" class="loginCommentBtn" @click="commentTwo">评论</a>
                                  </div>

                                  <!--二级评论-->
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
                          <a href="javascript:;" class="loadMoreList" v-show="loadingMoreBtn" @click="moreClick">加载更多</a>
                          <a href="javascript:;" class="loadMoreList" v-show="!loadingMoreBtn">没有更多了</a>
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
import Vue from 'vue'
import { CONFIG } from  '../assets/js/config';
import { network } from '../assets/js/network';
import rightBar from './rightBar'
import footerBar from './footerBar'
import Login from './Login'
export default {
  name: 'graphicInformationDetail',
    components: {
        rightBar,
        footerBar,
        Login
    },
    data () {
        return {
            graphicInformationDetailList:{},
            graphicInformationDetailListPraiseImg:[],
            themeId:'',
            commentsTotal:'',
            askData:{
                pageSize:5,
                pageNum:1
            },
            loadingMoreBtn:true,
            listData:[],//评论列表
            commentContent:'',//评论内容
            commentContentTwo:'',//二级评论内容
            userWriteAreaTwo:-1,//二级评论框
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

        this.themeId=this.$route.query.themeId
    },
    mounted(){
        this.graphicInformationDetail();
        this.getDataComments();

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

        graphicInformationDetail(){
            var that = this;
            network(CONFIG.themeDetail,{
                themeId:that.themeId,
                //themeId:9,
            },{method:'GET'}).then((res) => {
                that.graphicInformationDetailList=res.details;
                that.graphicInformationDetailList.praiseCount=res.details.themePraiseCount;
                that.graphicInformationDetailListPraiseImg=res.details.praiseHeadImgs;

                that.baidu.bdText=res.details.themeTitle;
            });
        },
        // 心点赞
        praise() {
            var that = this
            network(CONFIG.themePraise, {
                themeId: that.themeId,
                //shareId: 1616,
                praiseState : that.graphicInformationDetailList.is_praise === 'Y' ? "false" : "true",
            }).then((res) => {
                if(!localStorage.getItem("twUser")) {
                    that.LoginShow = true;
                }else if(res.head.code == 0){
                that.graphicInformationDetailList.is_praise = (res.details.praiseState === true) ? "Y" : "N";
                that.graphicInformationDetailList.praiseCount = res.details.praiseCount;
                that.graphicInformationDetailListPraiseImg = res.details.praiseHeadImgs;
                }
            })
        },
        closeLogin(){//关闭登录
            this.LoginShow = false;
        },
        //获取评论
        getDataComments() {
            var that = this;
            /*if (!that.loadingMoreBtn) {
                return false;
            }*/
            network(CONFIG.themeComments,{
                pageSize:that.askData.pageSize,
                pageNumber:that.askData.pageNum,
                themeId:that.themeId,
            },{method:'GET'}).then((res) => {
                that.commentsTotal = res.page.total;
                that.listData = that.listData.concat(res.data);
                that.askData.pageNum = res.page.pageNum + 1;
                that.loadingMoreBtn = that.askData.pageNum <= res.page.pages;
                that.replyCommentId = res.data.commentId;
            });
        },
        //加载更多评论
        moreClick(){
            var that=this;
            that.getDataComments();
        },
        // 评论点赞
        praiseComments(index) {
            var that = this;
            var item = that.listData[index];
            network(CONFIG.handthemepraise, {
                commentId: item.commentId,
                praiseStatus: !item.praise,
                flag: item.praise ? 'N' : 'Y',
                // token:'dGFud3VhcHBBUEkxNTM1NjE4NzQ3MjU2M20xeTd5'
            }).then((res) => {
                if(!localStorage.getItem("twUser")) {
                    that.LoginShow = true;
                }else if(res.head.code == 0){
                item.praise = !item.praise;
                item.praiseCount = item.praise ? item.praiseCount + 1 : item.praiseCount - 1;
                }
            });
        },
        comment(id){
            var that = this;
            if(!that.commentContent.trim()){
                Vue.toast('评论内容不能为空', {duration: 1500});
                return false;
            }
            network(CONFIG.themeCommentRelease, {
                content:that.commentContent,
                token:"dGFud3VhcHBBUEkxNTM2MzAyMTk4Mzc0eGp2anV0",
                themeId:that.themeId,
            }).then((res) => {
                that.commentContent = "";
                that.askData.pageNum = 1;
                that.morloadingMoreBtne = true;
                that.listData = [];
                that.userWriteAreaTwo=-1;
                that.getDataComments();
            });
        },
        userWriteAreaTwoShow(item,index){
            var that = this;
            if(!localStorage.getItem("twUser")) {
                that.LoginShow = true;
            }else {
                that.userWriteAreaTwo=index;
                that.replyCommentId=item.commentId;
                console.log(item.commentId);
                that.commentContentTwo='';
            }
        },
        commentTwo(id){
            var that = this;
            if(!that.commentContentTwo.trim()){
                Vue.toast('评论内容不能为空', {duration: 1500});
                return false;
            }
            network(CONFIG.themeCommentRelease, {
                content:that.commentContentTwo,
                token:"dGFud3VhcHBBUEkxNTM2MzAyMTk4Mzc0eGp2anV0",
                themeId:that.themeId,
                replyCommentId:that.replyCommentId,
            }).then((res) => {
                that.commentContentTwo = "";
                that.askData.pageNum = 1;
                that.morloadingMoreBtne = true;
                that.listData = [];
                that.getDataComments();
                this.userWriteAreaTwo=-1;
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.graphicInformationDetail{background-color:#FAFAFA}

.graphicInformationDetailArea{background-color: #fff;width:1080px;margin: 0 auto;}
.graphicInfMain{width: 100%; height: 520px;background-size: cover;    position: relative;}
.graphicInfMain .topNameArea{height: 60px;position: absolute;left: 0;bottom: 40px;width: 940px;padding: 0 70px;}
.graphicInfMain .topNameArea .title{font-size: 22px;color:rgba(255,255,255,1);}
.topNameArea .userInfoTime{font-size: 14px;color:rgba(255,255,255,1);height: 24px;line-height: 24px;width: 700px;float: left;    padding-top: 10px;}
.topNameArea .userInfoTime .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;border: 1px solid #999;}
.topNameArea .userInfoTime .name{}
.topNameArea .userInfoTime .time{}
.topNameArea .userInfoTime .technologyLabel{display: inline-block;font-size: 12px;color:rgba(255,255,255,1);background:rgba(62,216,196,1);margin-left: 23px;line-height: 24px;padding: 0 13px;}

/*分享区域*/
.topNameArea .threeWatch{width: 170px;float: right;position: relative;text-align: right;}
.topNameArea .threeWatch .shareName{width: 40px;float: left; font-size: 12px;color:#fff;line-height: 36px;}
.topNameArea .threeWatch .watchOne{display: inline-block;width:36px;height:36px;background:rgba(180,180,180,1);}
.topNameArea .threeWatch .watchOne a{padding-left: 0;}
.topNameArea .threeWatch .watchOne .bds_weixin.imgLinkIcon{width:36px;height:36px;margin: 0px;background: url("../../static/img/watch1.png") center;display: inline-block;}
.topNameArea .threeWatch .watchOne .bds_mshare.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch4.png") center;display: inline-block;}
.topNameArea .threeWatch .watchOne .bds_tsina.imgLinkIcon {width:36px;height:36px;margin: 0px;background: url("../../static/img/watch2.png") center;display: inline-block;}

.topNameArea .threeWatch .watchOne:hover{background:rgba(62,216,196,1);}
.topNameArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight h2{font-size: 14px;color: rgba(34,34,34,1);line-height: 26px;margin-top: 22px;}
.topNameArea .threeWatch .watchOne .wechatCodeShowArea .wechatRight p{font-size: 12px;color: rgba(34,34,34,1);line-height: 26px;}


.graphicInformationDetailMain{width: 940px;padding:0px 70px 70px; height: auto;overflow: hidden;margin: 0 auto;}
.introWordMain{margin: 30px 0 70px;}
/*.introWordMain >>> span{display: inline-block;margin: 10px 0;}
.introWordMain >>> img{display: block;width: 100%;margin: 10px 0;}*/


</style>
