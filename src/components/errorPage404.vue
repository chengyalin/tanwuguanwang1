<template>
  <div class="errorPage404"  v-title data-title="404">
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="left">
          <img src="static/img/404img1.png" alt="" class="leftimg">
          <h2 class="title">抱歉，出错了！</h2>
          <p class="intro">您要访问的页面暂时无法找到。</p>
          <router-link to="/" class="goHome">返回首页</router-link>
      </div>
      <img src="static/img/404img2.png" alt="" class="rightimg">
  </div>
</template>

<script>
import rightBar from './rightBar'
export default {
  name: 'errorPage404',
    components: {
        rightBar
    },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.errorPage404{overflow: hidden; background-color :rgb(255,255,255);width: 100% ; height: 100%;position: fixed;}
.left{ margin-top: 200px;margin-left: 215px;}
.leftimg{}
.title{font-size:30px;color:rgba(34,34,34,1);line-height:36px;margin-top: 50px;}
.intro{font-size:18px;color:rgba(34,34,34,1);line-height:36px;}
.goHome{display: block; width:170px;height:54px;line-height: 54px;background:rgba(62,216,196,1);color:rgba(254,254,254,1);text-align: center;margin: 50px 0}
.rightimg{display: block;width: 1429px;height: 1008px; position: absolute;right: -140px;bottom: -100px;z-index: -1;}
@media only screen and (max-width: 1366px) {
    .rightimg{display: block;width: 1000px;height: 807px; position: absolute;right: -140px;bottom: -100px;z-index: -1;}
}
</style>
