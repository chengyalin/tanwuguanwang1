<template>
  <div class="footerBar">
    <div class="footerMainArea">
	    <div class="contactUs">
	    	<h3>联系我们</h3>
	    	<div class="line"></div>
	    	<p class="address">深圳南山科技园飞亚达科技大厦1103室</p>
	    	<p class="tel"><img src="static/img/电话@2x.png" alt="" /> <a href="javascript:;" class="mail">4008803825</a></p>
	    	<p class="tel"><img src="static/img/emi纸飞机@2x.png" alt="" /><a href="mailto:bd@tanwuapp.com" class="mail">bd@tanwuapp.com</a></p>
	    </div>

    	<div class="productCenter">
    	  <h3>产品中心</h3>
    	  <div class="line"></div>
    	  <div class="proIntroGo">
              <router-link to="/productCenter" class="goProduct">游戏机 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">镜头 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">游戏机 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">影音 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">相机 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">酷玩 <em> > </em></router-link>
	    	  <router-link to="/productCenter" class="goProduct">长租 <em> > </em></router-link>
    	  </div>
    	</div>

    	<div class="dynamicsInfo">
    		<h3>资讯动态</h3>
    		<div class="line"></div>
    	  <div class="IntroGo">
    	  	<router-link to="/tanwuVideo" class="goProduct">探物视频 <em> > </em></router-link>
	    	  <router-link to="/graphicInformation" class="goProduct">图文资讯 <em> > </em></router-link>
	    	  <router-link to="/userDynamics" class="goProduct">用户动态 <em> > </em></router-link>
    	  </div>
    	</div>

    	<div class="explorationMore">
    		<h3>探索更多</h3>
    		<div class="line"></div>
    		<div class="moreGo">
    	  	<router-link to="/aboutUs" class="goProduct">关于探物 <em> > </em></router-link>
	    	  <router-link to="/contactUs" class="goProduct">联系我们 <em> > </em></router-link>
	    	  <router-link to="/joinUS" class="goProduct">加入我们 <em> > </em></router-link>
	    	  <router-link to="/leaseRules" class="goProduct">租赁规则 <em> > </em></router-link>
    	  </div>
    	</div>

    	<div class="focusUs">
    		<h3>关注我们</h3>
    		<div class="line"></div>
    		<div class="codeTwo">
    			<div class="downCode">
	    			<img src="static/img/APP下载@2x.png" alt="" class="codeImg" />
	    			<p class="codeInfo">下载探物APP</p>
	    		</div>
	    		<div class="weChatCode">
	    			<img src="static/img/微信公众号@2x.png" alt="" class="codeImg" />
	    			<p class="codeInfo">微信公众号</p>
	    		</div>
    		</div>
    	</div>
    </div>

    <div class="copyRight">
        <a href="http://www.miitbeian.gov.cn" target="_blank"><span>Copyright © 2016 深圳探物网络科技有限公司 All Rights Reserved.粤ICP备16035270号-1 站长统计</span></a>
    	<div class="itemIntro">
    		<router-link to="/serviceTerms" class="introductionItem">隐私条款</router-link>
    		<router-link to="/reliefTerms" class="introductionItem">免责声明</router-link>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerBar',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerBar{background-color: #2A4E56;width: 100%;height: 400px;position: relative;}
.footerMainArea{width: 1200px;height: 300px; margin: 0 auto;color: #fff;padding-top: 60px;}
.footerMainArea h3{font-size: 16px;line-height:34px;}
.footerMainArea .line{width: 18px;height: 2px;background-color: #fff;}

.contactUs{float: left;margin-right: 80px;}
.contactUs .address{margin-top: 27px;margin-bottom: 22px; font-size: 14px;color: #fff;opacity: .6;}
.contactUs .tel{color: #fff;font-size: 14px;line-height: 20px;margin-bottom: 11px;opacity: .6;}
.contactUs .tel img{display: inline-block;vertical-align: middle;margin-right: 10px;}
.contactUs .tel .mail{color: #fff;font-size: 14px;}


.productCenter{float: left;width: 200px;margin-right: 40px;}
.productCenter .proIntroGo,
.dynamicsInfo .IntroGo,
.explorationMore .moreGo{margin-top: 27px;}

.productCenter .goProduct,
.dynamicsInfo .goProduct,
.explorationMore .goProduct{width: 90px;float: left;margin-right: 10px;font-size: 14px;color: #fff;margin-bottom: 18px;opacity: .6;}


.dynamicsInfo{float: left;width: 70px; margin-right: 110px;}


.explorationMore{float: left;width: 80px; margin-right: 110px;}


.focusUs{float: left;}
.codeTwo{width: 220px;margin-top: 27px;}
.downCode,.weChatCode{width: 80px;float: left;text-align: center;margin-right: 24px;}
.codeImg{display: block; width: 80px;height: 80px;margin: 0 auto;}
.codeInfo{font-size: 12px;color: #fff;line-height: 40px;opacity: .6;}

.copyRight{background-color: #34575F;height: 60px;line-height: 60px;width: 1300px;position: absolute;left: 0;bottom: 0;color: #fff;opacity: .6;}
.copyRight span{margin-left: 310px;color: #fff;}
.copyRight .itemIntro{width: 200px;float: right;}
.copyRight .itemIntro .introductionItem{font-size: 12px;color: #fff;margin-right: 40px;}

.goProduct:hover,.introductionItem:hover{text-decoration: underline;}
</style>
