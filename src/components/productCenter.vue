<template>
  <div class="productCenter" v-title data-title="产品中心" @click="open=false">
    <div class="productCenterAll" :class="{'hide':isHide}">
        <div class="topBarArea">
            <router-link to="/indexPage">
                <img src="static/img/logo.png" alt="" class="logo">
            </router-link>
        </div>

        <rightBar></rightBar>

        <div class="topBanner">
            <div class="bgGray"></div>
            <div class="bannerAreaMain">
                <img src="static/img/banner3.png">
                <img src="static/img/bannerdescription3.png" alt="" class="bannerdescription">
            </div>
        </div>

        <div class="proMainArea">
            <div class="proNameArea">
                <div class="proNameLeft"  v-if="productTypes.length">
                    <span v-for= "(item,index) in productTypes"
                          :key = "'productTypes'+ item.type_id"
                          @click="changeType(item.type_id)"
                          :class="{ active: item.type_id == askData.typeId }">
                        {{item.type_name}}</span>
                </div>
                <div class="proChooseRight">
                    <div class="chooseValue" @click.stop="open = !open" >{{vals}} <img src="static/img/singledown.png" alt="" class="singleDown"></div>
                    <div class="selectOne" v-show="open">
                        <p class="nowNew"  @click="nowNewClick" ><img src="static/img/select1.png" alt="">{{nowNew}} </p>
                        <p class="nowMostComments"  @click="nowMostCommentsClick"><img src="static/img/select2.png" alt="">{{nowMostComments}}</p>
                    </div>
                </div>

            </div>

            <div class="productList">
                <ul>
                    <li v-for="(item,index) in productsList" :key = "(item,index)" >
                        <router-link :to="{path:'/productCenterDetail',query:{type_id:item.type_id,product_id:item.product_id}}"  tag="a" target="_blank">
                            <div class="produstOne">
                                <img :src="item.image_src" alt="" class="proImg">
                                <!--<i class="preferentialIcon">优惠</i>-->
                                <p class="name">{{item.name}}</p>
                                <p class="price"><span>¥</span> {{item.oldRent}}/{{item.rentUnit}}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <a href="javascript:;" class="loadMoreList" v-show="loadingMoreBtn" @click="moreClick">加载更多</a>
                <a href="javascript:;" class="loadMoreList" v-show="!loadingMoreBtn">没有更多了</a>
            </div>
        </div>
        <rightScrollTop ></rightScrollTop>
        <footerBar></footerBar>
    </div>

  </div>
</template>

<script>
import { CONFIG } from  '../assets/js/config';
import { network } from '../assets/js/network';
import rightBar from './rightBar'
import rightScrollTop from './rightScrollTop'
import footerBar from './footerBar'

export default {
  name: 'productCenter',
    components: {
        rightBar,
        rightScrollTop,
        footerBar,

    },
  data () {
    return {
        isHide:false,

        open:false,
        vals:'最新发布',
        nowNew:'最新发布',
        nowMostComments:'评论最多',
        loadingMoreBtn:'true',//加载更多产品
        askData:{
            typeId :0,
            pageSize:9,
            pageNum:1,
            orderBy:'new'
        },
        productTypes:[],//产品标题
        productsList:[],//产品列表
        type_id:'',
        product_id:'',


    }
  },

    mounted(){
        var that = this;
        network(CONFIG.productTypes,{},{method:'GET'}).then((res) => {//获取列表标题
            that.productTypes = res.details
        });
        that.getData();//获取产品中心列表数据
    },
    methods:{
        nowNewClick(){//模拟select下拉
            var that = this;
            that.vals = this.nowNew;
            that.open=false;
            that.askData.orderBy='new';
            that.askData.pageNum = 1;
            that.loadingMoreBtn = true;
            that.productsList=[];
            that.getData();
        },
        nowMostCommentsClick(){//模拟select下拉
            var that = this;
            that.vals = this.nowMostComments
            that.open=false;
            that.askData.orderBy='appraiseCount';
            that.askData.pageNum = 1;
            that.loadingMoreBtn = true;
            that.productsList=[];
            that.getData();
        },
        changeType(id){//点击标题
            var that = this;
            that.askData.typeId = id;
            that.askData.pageNum = 1;
            that.loadingMoreBtn = true;
            that.productsList=[];
            // that.vals = this.nowNew;
            // that.askData.orderBy='new';
            that.getData();
        },
        getData(){//获取产品中心列表数据
            var that = this;
            if (!that.loadingMoreBtn) {
                return false;
            }
            network(CONFIG.homes,{
                pageNumber:that.askData.pageNum,
                pageSize:that.askData.pageSize,
                typeId:that.askData.typeId,
                orderBy:that.askData.orderBy
            },{method:'GET'}).then((res) => {
                that.productsList =  that.productsList.concat(res.details.data);
                that.askData.pageNum = res.details.page.pageNum + 1;
                that.loadingMoreBtn =  that.askData.pageNum <= res.details.page.pages;
            });
        },
        moreClick(){//点击加载更多
            var that = this;
            that.getData();
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.productCenterAll.hide{display: none;}
.proMainArea{width: 100%;height: auto;overflow: hidden;}

.productList{width: 1320px; margin: 0 auto;clear: both;overflow: hidden;}
.productList ul{width: 1400px;padding: 10px 10px 0;height: auto;overflow: hidden;}
.productList ul li{width: 400px;height: 400px; float: left;margin-right: 50px;margin-bottom: 50px;}

.productList ul li .produstOne{position: relative;}
.productList ul li .produstOne .proImg{width: 400px;height: 320px;max-height: 320px;background-color: #EDEDED;
    transition: -webkit-transform .3s ease;
    transition: transform .3s ease;
    transition: transform .3s ease,-webkit-transform .3s ease;}
.productList ul li .produstOne .proImg:hover{box-shadow: 0 0 10px #dedede;
-webkit-transform: scale(1.01);
transform: scale(1.01);
}

.productList ul li .produstOne .preferentialIcon{width:56px;height:56px;background:rgba(211,69,86,1);color: #fff;line-height: 56px;
    border-radius: 50%;text-align: center;position: absolute;right: 20px;top:20px;}
.productList ul li .produstOne p{text-align: center;height: 34px; line-height: 34px;}
.productList ul li .produstOne .name{font-size: 16px;color:rgba(34,34,34,1);margin-top: 18px;}
.productList ul li .produstOne .price{font-size: 16px;color:rgba(211,69,86,1);font-weight: bold;}
.productList ul li .produstOne .price span{}

.chooseSelect{width: 210px;float: right;position: relative;}
.selectArea{width: 100%;height: 30px;position: relative;}
.chooseSelect>input{width: 100%;height: 30px;text-indent: 6px;}
.chooseSelect>.optionArea{position: absolute;width: 100%;top: 36px;left: 0;background-color: #f5f5f5;z-index: 2;}
.chooseSelect>.optionArea>label{display: block;cursor: pointer;text-indent: 10px;padding: 8px 0;margin:0;}





</style>
