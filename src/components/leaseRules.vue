<template>
  <div class="leaseRules"  v-title data-title="租赁规则">
      <div class="topBarArea">
          <img src="static/img/logo.png" alt="" class="logo">
      </div>

      <rightBar></rightBar>

      <div class="topBanner">
          <div class="bgGray"></div>
          <div class="bannerAreaMain">
              <img src="static/img/banner9.png">
              <img src="static/img/bannerdescription9.png" alt="" class="bannerdescription leaseRulesLeft">
          </div>
      </div>

      <div class="workChance">
          <div class="pannerArea">
              <ul>
                  <li v-for="(item,index) in leaseRules" :key="(item,index)">
                      <h2 class="title" :class="{'greenBG':currentIdx == index}"  @click="showToggle(index)"># {{ item.title }}
                          <span class="iconAdd"  v-if="currentIdx != index"><img src="static/img/add.png" alt=""></span>
                          <span class="iconReduce" v-if="currentIdx == index"><img src="static/img/reduce.png" alt=""></span>
                      </h2>
                      <div class="joinWork" v-if="currentIdx == index">
                          <div class="rentRulesArea">
                              <div class="rulesQuestion">
                                  <p class="question"><span class="questionWord">Q</span>{{item.title}}</p>
                                  <p class="answer">{{item.content}}</p>
                              </div>
                          </div>
                      </div>
                  </li>

              </ul>

          </div>
      </div>
      <footerBar></footerBar>
  </div>
</template>

<script>
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';
    import rightBar from './rightBar'
    import footerBar from './footerBar'
export default {
  name: 'leaseRules',
    components: {
        rightBar,
        footerBar
    },
    data () {
        return {
            open:false,
            currentIdx: 0,
            leaseRules: [],//租赁规则列表
        }
    },
    created () {

    },
    mounted() {
        this.getData()
    },
    methods:{
        showToggle:function(index){
            this.currentIdx = index;
        },
        getData () {
            var that = this;
            network(CONFIG.help, {'type': 2}).then((res) => {
                that.leaseRules=res.details.questions;
            })
        },



    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .workChance{width: 1100px;height: auto;overflow: hidden;margin: 100px auto;}
    .pannerArea{}
    .pannerArea ul{border-bottom: 1px solid #B4B4B4}
    .pannerArea ul li{}
    .pannerArea ul li .title{font-size: 18px;height: 60px;line-height: 60px;border-top: 1px solid #B4B4B4;cursor: pointer;color: #222;padding: 0 28px;}
    .pannerArea ul li .title .iconAdd{float: right;vertical-align: middle; }
    .pannerArea ul li .title .iconReduce{float: right;vertical-align: middle;line-height: 50px;}
    .pannerArea ul li .title{}
    .pannerArea ul li .title.greenBG{border: none;background-color: #3ED8C4;color: #fff;}

    .joinWork{padding: 40px 20px;border-bottom: 1px solid rgba(180,180,180,1);}
    .rentRulesArea{}
    .rulesQuestion{}
    .rulesQuestion .question{font-size: 16px;color:rgba(34,34,34,1);}
    .rulesQuestion .question span{display: inline-block;width:24px;height:24px;line-height: 24px;color:rgba(255,255,255,1); background:rgba(180,180,180,1);text-align: center;margin-right: 17px;}
    .rulesQuestion .answer{font-size: 14px;color:rgba(102,102,102,1);padding-left: 40px;margin-top: 15px;margin-bottom: 45px;}


</style>
