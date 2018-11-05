<template>
    <div class="joinUs"  v-title data-title="加入我们">
        <div class="topBarArea">
            <router-link to="/indexPage">
                <img src="static/img/logo.png" alt="" class="logo">
            </router-link>
        </div>

        <rightBar></rightBar>

        <div class="topBanner">
            <div class="bgGray"></div>
            <div class="bannerAreaMain">
                <img src="static/img/banner8.png">
                <img src="static/img/bannerdescription8.png" alt="" class="bannerdescription">
            </div>
        </div>

        <div class="workChance">
            <p class="intro">不仅仅是一份工作 更是实现梦想的一次机会</p>
            <a href="mailto:hr@tanwuapp.com" class="introEmail">投递邮箱：hr@tanwuapp.com</a>

            <div class="pannerArea">
                <ul>
                    <li v-for="(item,index) in joinUsList" :key="(item,index)">
                        <h2 class="title" :class="{'greenBG':currentIdx == index}"  @click="showToggle(index)">{{ item.jobName }}
                            <span class="iconAdd"  v-if="currentIdx != index"><img src="static/img/add.png" alt=""></span>
                            <span class="iconReduce" v-if="currentIdx == index"><img src="static/img/reduce.png" alt=""></span>
                        </h2>
                        <div class="joinWork" v-if="currentIdx == index">
                            <div class="WorkMain" v-for="item2 in item.jobDescription">
                                <h2 class="workDuty">【 {{item2.name}}  】</h2>
                                <p class="workIntro" v-for="item3 in item2.value">{{item3}}</p>
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
        name: 'joinUs',
        components: {
            rightBar,
            footerBar
        },
        data () {
            return {
                open:false,
                currentIdx:0,
                /*sites: [
                    { name: '1111' },
                    { name: '2223' },
                    { name: '33333' }
                ],*/
                joinUsList:[],

            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            showToggle:function(index){
                // if (this.currentIdx == index) return this.currentIdx = -1;
                this.currentIdx = index;
            },
            getData () {
                var that = this;
                network(CONFIG.joinUs,{},{method:'GET'}).then((res) => {
                    that.joinUsList=res.details;

                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .workChance{width: 1100px;height: auto;overflow: hidden;margin: 100px auto;}
    .workChance .intro,.workChance .introEmail{display: block; font-size: 18px;color: #222;line-height:34px;margin-top: 2px;font-weight: 600;}
    .workChance .introEmail{margin-bottom: 40px;}

    .pannerArea{}
    .pannerArea ul{border-bottom: 1px solid #B4B4B4;}
    .pannerArea ul li{}
    .pannerArea ul li .title{font-size: 18px;height: 60px;line-height: 60px;border-top: 1px solid #B4B4B4;cursor: pointer;color: #222;padding: 0 28px;}
    .pannerArea ul li .title .iconAdd{float: right;vertical-align: middle; }
    .pannerArea ul li .title .iconReduce{float: right;vertical-align: middle;line-height: 50px;}
    .pannerArea ul li .title{}
    .pannerArea ul li .title.greenBG{border: none;background-color: #3ED8C4;color: #fff;}

    .joinWork{padding: 20px 40px 50px;}
    .joinWork .workDuty{font-size: 14px;color: #444;line-height:34px;margin: 30px 0 10px;}
    .joinWork .workIntro{font-size: 14px;color: #444;line-height:34px;}
</style>
