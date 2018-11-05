<template>
  <div class="aboutUs"  v-title data-title="关于我们">
  	<div class="topBarArea">
        <router-link to="/indexPage">
            <img src="static/img/logo.png" alt="" class="logo">
        </router-link>
    </div>

      <rightBar></rightBar>

    <div class="topBanner">
    	<div class="bgGray"></div>
    	<div class="bannerAreaMain">
    		<img src="static/img/banner2.png">
            <img src="static/img/bannerdescription2.png" alt="" class="bannerdescription aboutusLeft">
    	</div>
    </div>

    <div class="whoAreWe">
      <div class="whoAreWeMain">
        <div class="left">
        	<div class="verticalLine">
        		<p class="wordNum">01</p>
        	</div>
          	<h2 class="title">我们是谁？</h2>
          	<p class="introduction">探物（tanworth）成立于2016年3月，是国内首家引领新奇科技数码租赁模式的成长型企业，目前在深圳、北京、武汉、杭州、厦门有5个网点分布，用户通过探物App可以租借到心仪的各类数码产品。 <br />
            探物致力于「信用租赁」的推动，在与芝麻信用达成战略合作后，通过用户授权，多维度评估用户信用等级，满足用户免押金租赁的消费需求，以租代买，拒绝闲置浪费。
            2018年探物获得蚂蚁金服生态基金数千万投资。</p>
          	<router-link to="/joinUs" class="joinUsWord">加入我们 ></router-link>
        </div>
        <div class="right">
          	<img src="static/img/aboutus1.png">
        </div>
      </div>
    </div>

    <div class="whatWeDo">
	    <div class="whatWeDoMain">
	        <div class="left">
	        	<div class="verticalLine">
	        		<p class="wordNum">02</p>
	        	</div>
	          	<h2 class="title">我们做什么？</h2>
	          	<p class="introduction">探物（tanworth）为用户提供最新、最酷和最为实用的科技数码产品，用户通过探物选择心仪的科技产品进行付费租赁，并创作分享高质量、好玩的科技视频和图文资讯，用户也能在探物发表产品的使用口碑，交流体验心得。探物想让所有热爱科技数码产品的用户，享受到前沿科技带来的愉悦和兴奋，把高端的科技产品引入到大众消费的日常生活中。</p>
	        </div>
	        <!--<div class="right">
                <a :href="videoOne.aboutme_video" target="_blank">
                    <div class="videoImg" :style="{'background-image':'url('+videoOne.aboutme_cover+')'}"><i class="VideoIcon"></i></div>
                </a>
        	</div>-->
            <div class="right">
                <div class="videoImg" @click="maskVideo=!maskVideo"  :style="{'background-image':'url('+videoOne.index_cover+')'}" onclick="document.getElementById('video').play()"><i class="VideoIcon"></i></div>
                <div class="maskVideo" v-show="maskVideo===true" @click="maskVideo=!maskVideo" onclick="document.getElementById('video').pause()"></div>
                <video :src="videoOne.index_video" id="video" controls="controls" class="videoOkPlay" v-show="maskVideo===true" >
                    当前浏览器不支持 video直接播放,请升级
                </video>

            </div>
	    </div>
    </div>

    <div class="ourStrengths">
   		<div class="ourStrengthsArea">
   			<div class="introFour">
	   			<ul>
	   				<li>
	   					<p class="intro"><strong>5</strong> <span>个</span></p>
	   					<p class="introWord">线下服务覆盖城市</p>
	   				</li>
	   				<li>
	   					<p class="intro"><strong>100+</strong> <span>家</span></p>
	   					<p class="introWord">已有合作伙伴</p>
	   				</li>
	   				<li>
	   					<p class="intro"><strong>数百万</strong> <span>人</span></p>
	   					<p class="introWord">已覆盖用户数</p>
	   				</li>
	   				<li>
	   					<p class="intro"><strong>1000+ </strong> <span>SKU</span></p>
	   					<p class="introWord">已上线产品</p>
	   				</li>
	   			</ul>
	   		</div>
	   		<div class="ourStrengthsMain">
		        <div class="left">
		        	<div class="verticalLine">
		        		<p class="wordNum">03</p>
		        	</div>
		          	<h2 class="title">我们的优势？</h2>
		          	<p class="introduction">我们在全国设立五个城市网点，方便用户就近回寄；我们只发顺丰物流，以保证数码产品的运输安全；我们接入芝麻信用平台，只为更多的免除用户押金；我们有安心享服务可供选择，让用户在产品使用过程中没有后顾之忧。</p>
		        </div>
		        <div class="right">
		          	<img src="static/img/aboutus2.png" alt="">
                </div>
		    </div>
		    <div class="ourStrengthsMainTwo">
		        <div class="left">
                    <img src="static/img/aboutus3.png" alt="">
		        </div>
		        <div class="right">
		        	<div class="verticalLine">
		        		<p class="wordNum">04</p>
		        	</div>
		          	<h2 class="title">我们的愿景？</h2>
		          	<p class="introduction">在未来，希望能与每一个热爱科技产品，喜欢极客文化，关注数码资讯的小伙伴一起成长，一起探索更多的可能。希望我们的每一次前进，都能推动共享经济的前进，让租赁消费传播到更广的人群。</p>
		        </div>
		    </div>
   		</div>
    </div>

    <div class="ourPartners">
    	<div class="bgGrayHalf"></div>
    	<div class="ourPartnersMain">
	        <div class="left">
	        	<div class="verticalLine">
	        		<p class="wordNum">05</p>
	        	</div>
	          	<h2 class="title">我们与合作伙伴？</h2>
	          	<p class="introduction">蚂蚁金服、芝麻信用、蚂蚁花呗、飞猪、钉钉、淘宝、闲鱼、GoPro、大疆、索尼、Insta 360、佳能、尼康、Pico、爱奇艺、Yotaphone、小黑侠、HiSpot、FILL、Libratone、科大讯飞、Bose、极米、飞宇......</p>
	        </div>
      	</div>
      	<div class="partnersLogo">
      		<ul>
      			<li>
      				<img src="static/img/1@2x.png" class="logoImg">
      				<img src="static/img/2@2x.png" class="logoImg">
      				<img src="static/img/3@2x.png" class="logoImg">
      				<img src="static/img/4@2x.png" class="logoImg">
      				<img src="static/img/5@2x.png" class="logoImg">
      				<img src="static/img/6@2x.png" class="logoImg">
      			</li>
      			<li>

      				<img src="static/img/7@2x.png" class="logoImg">
      				<img src="static/img/8@2x.png" class="logoImg">
      				<img src="static/img/9@2x.png" class="logoImg">
      				<img src="static/img/10@2x.png" class="logoImg">
      				<img src="static/img/11@2x.png" class="logoImg">
      			</li>
      			<li>
      				<img src="static/img/12@2x.png" class="logoImg">
      				<img src="static/img/13@2x.png" class="logoImg">
      				<img src="static/img/14@2x.png" class="logoImg">
      				<img src="static/img/15@2x.png" class="logoImg">
      				<img src="static/img/16@2x.png" class="logoImg">
      				<img src="static/img/17@2x.png" class="logoImg">
      			</li>
      			<li>
      				<img src="static/img/18@2x.png" class="logoImg">
      				<img src="static/img/19@2x.png" class="logoImg">
      				<img src="static/img/20@2x.png" class="logoImg">
      				<img src="static/img/21@2x.png" class="logoImg">
      				<img src="static/img/22@2x.png" class="logoImg">

      			</li>
      			<li>
      				<img src="static/img/23@2x.png" class="logoImg">
      				<img src="static/img/24@2x.png" class="logoImg">
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
  name: 'aboutUs',
  components: {
      footerBar,
      rightBar
    },
  data () {
    return {
        maskVideo:false,
        videoOne:{}
    }
  },
    mounted(){
        var that = this;
        that.getData();
    },
    methods:{
        getData(){
            var that = this;
            network(CONFIG.aboutUsVideo,{clientType:'web:h5',token:'dGFud3VhcHBBUEkxNTM0OTI2NTI1MDE0ZWk2bW94'},{method:'GET'}).then((res) => {
                console.log(res)
                that.videoOne=res.details;
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*我们是谁*/
.whoAreWe{height: auto;overflow: hidden;}
.whoAreWeMain{width: 1100px;height: 450px;margin: 88px auto 100px;}
.whoAreWeMain .left{width: 360px;float: left;padding-left: 57px;padding-top: 70px;position: relative;}
.whoAreWeMain .left .verticalLine{width:2px;height:100px;background:rgba(170,170,170,1);position: absolute;top:75px;left: 0;}
.whoAreWeMain .left .verticalLine .wordNum{font-size:16px;color:rgba(170,170,170,1);padding-left: 8px;}
.whoAreWeMain .left .title{font-size: 18px;color: #222;margin-bottom: 28px;}
.whoAreWeMain .left .introduction{font-size: 14px;color: #666;line-height:26px;}
.whoAreWeMain .left .joinUsWord{display: inline-block;line-height: 30px;; font-size: 14px;color: #AAA;margin-top: 30px;border-bottom: 1px solid #AAA;}
.whoAreWeMain .right,.whoAreWeMain .right img{width: 550px;height: 360px;float: right;background:rgba(238,238,238,1);}



.whatWeDo{height: 500px;background:rgba(72,197,181,1);position: relative;margin-bottom: 120px;}
.whatWeDoMain{width: 1100px;height:450px;margin: 88px auto 100px;}
.whatWeDoMain .left{width: 380px;float: left;padding-left: 57px;padding-top: 70px;margin-top: 72px;position: relative;}
.whatWeDoMain .left .verticalLine{width:2px;height:100px;background:#fff;position: absolute;top:75px;left: 0;}
.whatWeDoMain .left .verticalLine .wordNum{font-size:16px;color:#fff;padding-left: 8px;}
.whatWeDoMain .left .title{font-size: 18px;color: #fff;margin-bottom: 28px;}
.whatWeDoMain .left .introduction{font-size: 14px;color: #fff;line-height:26px;}
.whatWeDoMain .right{width: 960px;height: 440px;background:rgba(238,238,238,1);position: absolute;right: 0;top:155px;}

.whatWeDoMain .right .videoImg{width: 960px;height: 440px;background-size: cover;}
.whatWeDoMain .right .videoImg:after {
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
.whatWeDoMain .right .videoImg:hover:after {opacity: 1;}
.whatWeDoMain .right  .videoImg  .VideoIcon{position: absolute;
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

.whatWeDoMain .right .videoOkPlay{width:1000px;height: 600px;position: fixed;left: 50%;top:50%;transform: translate(-50%, -50%);z-index: 106;}
.whatWeDoMain .right .maskVideo{ width: 100%;height: 100%;position: fixed;left: 0;top: 0;right: 0;bottom: 0;background: rgba(0,0,0,.8);z-index:105;}

.ourStrengths{height: 1147px;}
.ourStrengthsArea{width: 1100px;height:450px;margin: 88px auto 100px;}
.introFour{width: 100%;height: auto;overflow: hidden;margin: 190px 0 80px;}
.introFour ul{}
.introFour li{width: 270px;float: left;text-align: center;}
.introFour li .intro{line-height: 60px;}
.introFour li .intro strong{font-size: 42px;color: #3ED8C4;}
.introFour li .intro span{font-size: 14px;color: #222;}
.introFour li .introWord{font-size: 16px;color: #666;}

.ourStrengthsMain{width: 1100px;height: 450px;margin: 88px auto 0;}
.ourStrengthsMain .left{width: 320px;float: left;padding-left: 57px;padding-top: 70px;position: relative;}
.ourStrengthsMain .left .verticalLine{width:2px;height:100px;background:rgba(170,170,170,1);position: absolute;top:75px;left: 0;}
.ourStrengthsMain .left .verticalLine .wordNum{font-size:16px;color:rgba(170,170,170,1);padding-left: 8px;}
.ourStrengthsMain .left .title{font-size: 18px;color: #222;margin-bottom: 28px;}
.ourStrengthsMain .left .introduction{font-size: 14px;color: #666;line-height:26px;}
.ourStrengthsMain .right,.ourStrengthsMain .right img{width: 480px;height: 280px;float: right;margin-top: 20px;}

.ourStrengthsMainTwo{width: 1100px;height: 450px;margin: 8px auto 100px;}
.ourStrengthsMainTwo .left,.ourStrengthsMainTwo .left img{width: 480px;height: 280px;float: left;}
.ourStrengthsMainTwo .right{width: 320px;float: right;padding-left: 57px;padding-top: 70px;position: relative;}
.ourStrengthsMainTwo .right .verticalLine{width:2px;height:100px;background:rgba(170,170,170,1);position: absolute;top:75px;left: 0;}
.ourStrengthsMainTwo .right .verticalLine .wordNum{font-size:16px;color:rgba(170,170,170,1);padding-left: 8px;}
.ourStrengthsMainTwo .right .title{font-size: 18px;color: #222;margin-bottom: 28px;}
.ourStrengthsMainTwo .right .introduction{font-size: 14px;color: #666;line-height:26px;}


.ourPartners{height: 960px;position: relative;}
.bgGrayHalf{width: 50%;height: 960px;background:rgba(245,242,242,1);position: absolute;left: 0;top:0;z-index: -1;}
.ourPartnersMain{width: 1100px;height: 310px;margin: 88px auto 0;}
.ourPartnersMain .left{width:345px;float: left;padding-left: 57px;padding-top: 70px;position: relative;}
.ourPartnersMain .left .verticalLine{width:2px;height:100px;background:rgba(170,170,170,1);position: absolute;top:75px;left: 0;}
.ourPartnersMain .left .verticalLine .wordNum{font-size:16px;color:rgba(170,170,170,1);padding-left: 8px;}
.ourPartnersMain .left .title{font-size: 18px;color: #222;margin-bottom: 28px;}
.ourPartnersMain .left .introduction{font-size: 14px;color: #666;line-height:26px;}

.partnersLogo{width: 1200px;height: 450px;margin:0 auto;}
.partnersLogo ul{}
.partnersLogo ul li{text-align: center;}
.logoImg{display: inline-block;width: 190px;height: 80px;margin: 10px 0px;}

</style>
