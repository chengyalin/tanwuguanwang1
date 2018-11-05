<template>
    <div class="rightScrollTop" :class="{rightScrollTopShow:isActive}">
        <!--右边返回顶部联系客服-->
        <div class="rightScrollTopArea">
            <a href="javascript:;" class="scrollTop" id="toTop" @click="toTop(step)" ><img src="static/img/top.png" alt=""></a>
            <div class="linkKFArea" @click="chat">
                <a href="#" class="linkKFTip"><img src="static/img/KFTip.png" alt=""></a>
                <a href="javascript:;" class="linkKF"><img src="static/img/KF.png" alt=""></a>
            </div>
        </div>
    </div>
</template>


<script>
    import { CONFIG } from  '../assets/js/config';
    import { network } from '../assets/js/network';
    export default{
        props:{
            step:{   //此数据是控制动画快慢的
                type:Number,
                default:50
            }
        },
        data(){
            return {
                isActive:false,
            }
        },
        created(){
            var vm=this;
            window.onscroll=function(){
                if (document.documentElement.scrollTop>1000) {
                    vm.isActive=true;
                }else {
                    vm.isActive=false;
                }
            }
        },
        methods:{
            toTop(i){
                //参数i表示间隔的幅度大小，以此来控制速度
                document.documentElement.scrollTop-=i;
                if (document.documentElement.scrollTop>0) {
                    var c=setTimeout(()=>this.toTop(i),16);
                }else {
                    clearTimeout(c);
                }
            },

            //美洽
            chat(){
                ;(function(m, ei, q, i, a, j, s) {
                    m[i] = m[i] || function() {
                        (m[i].a = m[i].a || []).push(arguments)
                    };
                    j = ei.createElement(q),
                        s = ei.getElementsByTagName(q)[0];
                    j.async = true;
                    j.charset = 'UTF-8';
                    j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t';
                    s.parentNode.insertBefore(j, s);
                })(window, document, 'script', '_MEIQIA');
                _MEIQIA('entId', 62542);
                _MEIQIA('withoutBtn');

                if(!localStorage.getItem("twUser")){
                    _MEIQIA('showPanel');
                }else{
                    network(CONFIG.userbaseInfo,{},{codeFlag:true}).then((res) => {
                        if(res.head.code == 0){
                            var userbaseInfo = res.details;
                            _MEIQIA('clientId', userbaseInfo.uid);
                            _MEIQIA('metadata',userbaseInfo);
                            localStorage.setItem('userbaseInfo',JSON.stringify(userbaseInfo));
                        }
                        _MEIQIA('showPanel');
                    });
                }

            }

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rightScrollTop{display: none;z-index: 999}
    .rightScrollTopShow{display: block;}
    .rightScrollTopArea{width: 180px;height: 180px;position: fixed;right: 20px;bottom: 100px;z-index: 2;}
    .rightScrollTopArea .scrollTop{position: absolute;top:0;right: 0;}
    .rightScrollTopArea .linkKFArea{width: 300px;height: 130px;}
    .rightScrollTopArea .linkKFArea .linkKF{position: absolute;top:65px;right: 0;width: 58px;height: 58px;background:rgba(62,216,196,1);}
    .rightScrollTopArea .linkKFArea .linkKF:hover{background-color: #38cdba;}
    .rightScrollTopArea .linkKFArea .linkKF img{margin: 15px;}
    .rightScrollTopArea .linkKFArea .linkKFTip{position: absolute;right: 62px;top: 78px;display: none;}
    .rightScrollTopArea .linkKFArea:hover .linkKFTip{display: block;}

</style>
