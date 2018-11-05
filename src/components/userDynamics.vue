<template>
  <div class="userDynamics"  @click="open=false" v-title data-title="用户动态" >
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="topBanner">
          <div class="bgGray"></div>
          <div class="bannerAreaMain">
              <img src="static/img/banner4.png">
              <img src="static/img/bannerdescription4.png" alt="" class="bannerdescription userDynamicsLeft">
          </div>
      </div>

      <div class="userDynamicsArea">
          <div class="proNameArea">
              <div class="proNameLeft" v-if="sharesTagName.length">
                  <span v-for= "(item,index) in sharesTagName"
                        :key = "'sharesTagName'+ item"
                        @click="changeType(item,index)"
                        :class="{ active:currentIdx == index}">
                        #{{item}}</span>
              </div>
              <div class="proChooseRight">
                  <div class="chooseValue" @click.stop="open = !open" >{{vals}}<img src="static/img/singledown.png" alt="" class="singleDown"></div>
                  <div class="selectOne" v-show="open">
                      <p class="nowNew"  @click="nowNewClick" ><img src="static/img/select1.png" alt="">{{nowNew}} </p>
                      <p class="nowMostComments"  @click="nowMostCommentsClick"><img src="static/img/select2.png" alt="">{{nowMostComments}}</p>
                  </div>
              </div>
          </div>

          <div class="userDynamicsList">
              <ul v-if="userDynamicsList.length">
                  <li  v-for="(item,index) in userDynamicsList" :key = "(item,index)">
                      <router-link :to="{path:'/userDynamicsDetail',query:{shareId:item.shareId}}"  tag="a" target="_blank">
                          <div class="userDynamicsOne">
                              <img :src="item.image" alt="" class="userDynamicsImg">
                              <div class="userDynamicsInfo">
                                  <p class="technologyLabel"><span>{{item.tag}}</span></p>
                                  <p class="name">{{item.detail}}</p>
                                  <div class="userInfoTime">
                                      <div class="left">
                                          <img :src="item.headThumb" alt="" class="userLOGO">
                                          <span  class="name">{{item.nickName}}</span>
                                          <i class="circle">.</i>
                                          <span  class="time">{{item.datetime | formatTime11}}</span>
                                      </div>
                                      <div class="right">
                                          <span class="zan comment"><img src="static/img/comment.png" alt="">{{item.commentCount}}</span>
                                          <span class="zan"><img src="static/img/zan.png" alt="" class="marginTop">{{item.praiseCount}}</span>
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
      <rightScrollTop ></rightScrollTop>
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
  name: 'userDynamics',
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

        sharesTagName:[],//分类标题
        userDynamicsList:[],//产品列表
        currentIdx:0,//分类标题索引
        askData: { //数据分页
            pageSize: 12,
            pageNum: 1,
            tag:"所有标签",
            orderBy:1
        },
        shareId:''
    }
  },

    mounted(){
        var that=this;
        //获取分类标题
        network(CONFIG.sharesTags,{token:'dGFud3VhcHBBUEkxNTM1NDI3NTU3NTk3NHBqdGEx'},{method:'GET'}).then((res) => {
            that.sharesTagName = res.details.list;
            console.log(res.details)
        });
        that.getData()
    },
    methods:{
        nowNewClick(){//模拟select下拉
            var that = this;
            that.vals = this.nowNew;
            that.open=false;
            that.askData.orderBy=1;
            that.initData();
        },
        nowMostCommentsClick(){//模拟select下拉
            var that = this;
            that.vals = this.nowMostComments
            that.open=false;
            that.askData.orderBy=2;
            that.initData();
        },

        changeType(item,index){//点击标题其他
            var that = this;
            that.currentIdx = index;//获取当前点击的索引
            that.askData.tag=item //获取tag名称
            that.initData();
        },
        initData(){
            var that = this;
            that.askData.pageNum = 1;
            that.more = true;
            that.userDynamicsList=[];
            // that.vals = this.nowNew;
            // that.askData.orderBy=1;
            that.getData();
        },
        getData(){//获取列表数据
            var that = this;
            network(CONFIG.sharesByTag,{
                pageNumber:that.askData.pageNum,
                pageSize:that.askData.pageSize,
                tag:that.askData.tag,
                orderBy:that.askData.orderBy
            },{method:'GET'}).then((res) => {
                that.userDynamicsList =  that.userDynamicsList.concat(res.data);
                that.askData.pageNum = res.page.pageNum + 1;
                that.more =  that.askData.pageNum <= res.page.pages;
            });
        },
        moreClick(){//点击加载更多
            var that = this;
            that.getData();//获取列表数据
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userDynamics{background-color: #F6F6F6;}

.userDynamicsArea{}

.userDynamicsList{width: 1325px;margin: 0 auto;height: auto;overflow: hidden;padding-left: 10px;}
/*.userDynamicsList ul{width: 1325px;margin: 0 auto;height: auto;overflow: hidden;padding-left: 10px;}*/
/*.userDynamicsList ul li{width:300px;float: left;margin-right: 30px;margin-bottom: 34px;}*/
.userDynamicsList ul{
    padding-top: 10px;
    column-width:300px;
    -webkit-column-width:300px;
    -moz-column-width:300px;
    -o-column-width:300px;
    -ms-column-width:300px;
}
.userDynamicsList ul li{
    margin: 0px 20px 34px 0;
    box-sizing: border-box;
    page-break-inside: avoid;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
    counter-increment: item-counter;
    height:100%;overflow: auto;/* 为了控制文本块分解成单独的列   height:100%;overflow: auto;这两行代码是为了兼容火狐浏览器的因为内容太长而出现断层的问题。*/
}
.userDynamicsList ul li:hover{box-shadow: 0 0 10px #dedede;}
.userDynamicsOne{background-color: #fff;}
.userDynamicsOne .userDynamicsImg{display: block; width: 300px;height: auto;}
.userDynamicsOne .userDynamicsInfo{padding:0 20px;}
.userDynamicsOne  .technologyLabel{padding: 15px 0;}
.userDynamicsOne  .technologyLabel span{display: inline-block;font-size: 12px;color:rgba(255,255,255,1);background:rgba(62,216,196,1);line-height: 24px;padding: 0 13px;}
.userDynamicsOne .name{font-size: 14px;color:rgba(34,34,34,1);line-height:22px;margin-bottom: 28px;}

.userDynamicsOne .userInfoTime{font-size: 14px;color:rgba(136,136,136,1);height: 24px;line-height: 24px;border-top: 1px solid rgba(240,240,240,1);padding: 14px 0 20px;}
.userDynamicsOne .userInfoTime .left{width: 150px;float: left;}
.userDynamicsOne .userInfoTime .left .userLOGO{width: 22px;height: 22px;border-radius: 50%;vertical-align: middle;}
.userDynamicsOne .userInfoTime .left .name{display: inline-block;max-width: 60px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-bottom: 0;color:rgba(136,136,136,1);}
.userDynamicsOne .userInfoTime .left .time{}
.userDynamicsOne .userInfoTime .right{width: 110px;float: right}
.userDynamicsOne .userInfoTime .right .zan{float: right;}
.userDynamicsOne .userInfoTime .right .zan img{display: inline-block;width: 15px;height: 15px;vertical-align: middle;margin-right: 6px;}
.userDynamicsOne .userInfoTime .right .zan.comment{margin-left: 14px;}
</style>
