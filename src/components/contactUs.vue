<template>
  <div class="contactUs"  v-title data-title="联系我们">
      <div class="topBarArea">
          <router-link to="/indexPage">
              <img src="static/img/logo.png" alt="" class="logo">
          </router-link>
      </div>

      <rightBar></rightBar>

      <div class="topBanner">
          <div class="bgGray"></div>
          <div class="bannerAreaMain">
              <img src="static/img/banner7.png">
              <img src="static/img/bannerdescription7.png" alt="" class="bannerdescription">
          </div>
      </div>

      <div class="writeInfo">
          <div class="leftWrite">
            <h2 class="title">填写表单 <br>
                我们将会尽快与你取得联系</h2>
            <div class="formArea">
                <ul>
                    <li>
                        <div class="writeWord">
                            <label for="" class="name">姓名/公司名*</label>
                            <input type="text" placeholder="请输入公司名称" v-model="inputTextName">
                            <p class="errorInfo" v-show="errorInfo1">姓名/公司名不正确</p>
                        </div>
                    </li>
                    <li>
                        <div class="writeWord">
                            <label for="" class="name">电子邮箱*</label>
                            <input type="text" placeholder="请输入电子邮箱" v-model="inputTextEmail">
                            <p class="errorInfo" v-show="errorInfo2">电子邮箱不正确</p>
                        </div>
                    </li>
                    <li>
                        <div class="writeWord">
                            <label for="" class="name">电话号码*</label>
                            <input type="text" placeholder="请输入电话号码" v-model="inputTextTel">
                            <p class="errorInfo" v-show="errorInfo3">电话号码不正确</p>
                        </div>
                    </li>
                    <li>
                        <div class="writeWord">
                            <label for="" class="name">联系主题*</label>
                            <input type="text" placeholder="请简要描述联系主题" maxlength="40" v-model="inputTextTheme">
                            <p class="errorInfo" v-show="errorInfo4">联系主题不能为空</p>
                        </div>
                    </li>
                    <li>
                        <div class="writeWord">
                            <p class="textareaName">联系信息*</p>
                            <textarea rows="" cols="" placeholder="请输入联系信息" v-model="textareaName" ></textarea>
                            <p class="errorInfo" v-show="errorInfo5">联系内容不能为空</p>
                        </div>
                    </li>
                </ul>
            </div>
              <button class="submitBtn" @click="submitALL">{{submitText}}</button>
          </div>
          <div class="rightInfo">
              <div class="ourInfo">
                  <h2 class="title">深圳总部</h2>
                  <p class="addr"><img src="static/img/contactus1.png" alt="">深圳南山科技园飞亚达科技大厦1103室</p>
                  <p class="addr"><img src="static/img/contactus2.png" alt="">4008803825</p>
                  <p class="addr"><a href="mailto:bd@tanwuapp.com"><img src="static/img/contactus3.png" alt="">bd@tanwuapp.com</a></p>
                  <p class="addr"><img src="static/img/contactus4.png" alt="">周一至周日 9:30-18:30</p>
              </div>
              <div class="ourInfo">
                  <h2 class="title">北京网点</h2>
                  <p class="addr"><img src="static/img/contactus1.png" alt="">北京市朝阳区广渠路36号首城国际22号楼2单元2601</p>
                  <p class="addr"><img src="static/img/contactus2.png" alt="">黄先生  18513220602</p>
                  <p class="addr"><img src="static/img/contactus4.png" alt="">周一至周日 9:30-18:30</p>
              </div>
              <div class="ourInfo">
                  <h2 class="title">杭州网点</h2>
                  <p class="addr"><img src="static/img/contactus1.png" alt="">浙江省杭州市余杭区闲林新时代城市家园3-2104</p>
                  <p class="addr"><img src="static/img/contactus2.png" alt="">张小姐  15658128213</p>
                  <p class="addr"><img src="static/img/contactus4.png" alt="">周一至周日 9:30-18:30</p>
              </div>
              <div class="ourInfo">
                  <h2 class="title">武汉网点</h2>
                  <p class="addr"><img src="static/img/contactus1.png" alt="">湖北省武汉市江岸区胜利街6号婚纱城一楼文心相机</p>
                  <p class="addr"><img src="static/img/contactus2.png" alt="">明小姐  13545885702</p>
                  <p class="addr"><img src="static/img/contactus4.png" alt="">周一至周日 9:30-18:30</p>
              </div>
              <div class="ourInfo">
                  <h2 class="title">厦门网点</h2>
                  <p class="addr"><img src="static/img/contactus1.png" alt="">厦门市海沧区嵩屿南一里166号302</p>
                  <p class="addr"><img src="static/img/contactus2.png" alt="">覃小姐  13606017054  </p>
                  <p class="addr"><img src="static/img/contactus4.png" alt="">周一至周日 9:30-18:30</p>
              </div>

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
  name: 'contactUs',
    components: {
        rightBar,
        footerBar
    },
  data () {
    return {
        errorInfo1:false,
        errorInfo2:false,
        errorInfo3:false,
        errorInfo4:false,
        errorInfo5:false,

        inputTextName:'',
        inputTextEmail:'',
        inputTextTel:'',
        inputTextTheme:'',
        textareaName:'',


        submitText:'提 交',
        Submitted:'已成功提交'
    }
  },
    mounted(){

    },
    methods:{
        submitALL(){
            var that=this;
            var regPhone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; //手机号正则验证
            var regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");//邮箱验证

            if (that.inputTextName===''){
                that.errorInfo1=true;
            }else {
                that.errorInfo1=false;
            };

            if (that.inputTextEmail===''|| !regEmail.test(that.inputTextEmail)){
                that.errorInfo2=true;
            }else {
                that.errorInfo2=false;
            };

            if (that.inputTextTel===''|| !regPhone.test(that.inputTextTel)){
                that.errorInfo3=true;
            }else {
                that.errorInfo3=false;
            };

            if (that.inputTextTheme===''){
                that.errorInfo4=true;
            }else {
                that.errorInfo4=false;
            };

            if (that.textareaName===''){
                that.errorInfo5=true;
            }else {
                that.errorInfo5=false;
            };

            network(CONFIG.contactUs,{
                company:that.inputTextName,
                email:that.inputTextEmail,
                phone:that.inputTextTel,
                title:that.inputTextTheme,
                content:that.textareaName
            }).then((res) => {
                if(that.errorInfo1===false && that.errorInfo2===false && that.errorInfo3===false && that.errorInfo4===false && that.errorInfo5===false){
                    that.submitText=that.Submitted;
                }else {
                    that.submitText=that.submitText;
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .contactUs{background-color: #F6F6F6;}
.writeInfo{width: 1200px;margin: 109px auto;height: auto;overflow: hidden;}
 .writeInfo .leftWrite{width: 670px;float: left;}
 .writeInfo .leftWrite{width: 670px;float: left;}
 .writeInfo .leftWrite .title{font-size: 18px;color:rgba(34,34,34,1);line-height: 34px;margin-bottom: 40px;}
 .writeInfo .formArea{}
 .writeInfo .formArea ul{}
 .writeInfo .formArea ul li{margin-bottom: 32px;}
 .writeInfo .formArea ul li .writeWord{position: relative;}
 .writeInfo .formArea ul li .writeWord .name{font-size: 14px;color:rgba(102,102,102,1);position: absolute;left: 20px;top:17px;}
 .writeInfo .formArea ul li .writeWord input{width: 540px;line-height: 14px;padding: 17px 10px 17px 120px;font-size: 14px;color:rgba(34,34,34,1);background:rgba(238,238,238,1);border: none;}
 .writeInfo .formArea ul li .writeWord input::placeholder{}
 .writeInfo .formArea ul li .writeWord .errorInfo{position: absolute;bottom: -34px;width: 100%; font-size: 12px;color:rgba(212,60,50,1);height: 34px;line-height: 34px;/*border-top: 2px solid rgba(212,60,50,1);*/
     animation:myfirst 3s;
     -moz-animation:myfirst 3s; /* Firefox */
     -webkit-animation:myfirst 3s; /* Safari and Chrome */
     -o-animation:myfirst 5s; /* Opera */
 }

 @keyframes myfirst
 {
     0%   {width: 50%}
     100% {width: 100%}
 }
 .writeInfo .formArea ul li .writeWord .textareaName{font-size: 14px;color:rgba(102,102,102,1);background:rgba(238,238,238,1); padding: 17px 0 17px 20px;}
 .writeInfo .formArea ul li .writeWord textarea{width: 630px; max-width: 630px;padding: 0 20px;height: 160px; background:rgba(238,238,238,1);border: none;esize: horizontal;}
 .writeInfo .formArea ul li .writeWord .contactInfo{position: absolute;top:20px;left: 20px;font-size: 14px;color:rgba(34,34,34,1);top: 55px;}
 .writeInfo .submitBtn{width:170px;height:54px;background:rgba(62,216,196,1);font-size: 14px;border: none;color: #fff;}

.writeInfo .rightInfo{width: 370px;float: right; padding-left: 65px;border-left: 1px solid rgba(170,170,170,1);}
.writeInfo .rightInfo .title{font-size: 18px;color:rgba(34,34,34,1);line-height: 34px;margin-bottom: 24px;}
.writeInfo .rightInfo .ourInfo{margin-bottom: 50px;}
.writeInfo  .ourInfo{}
.writeInfo  .ourInfo p{padding: 4px 0; }
.writeInfo  .ourInfo p a{display: block;color:rgba(34,34,34,1);}
.writeInfo  .ourInfo img{margin-right: 8px;}
</style>
