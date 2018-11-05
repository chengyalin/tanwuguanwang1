// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import filter from './assets/js/filter'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import Datepicker from 'hsy-vue-datepicker'
Vue.use(Datepicker)

import { DatePicker } from 'iview';
import 'iview/dist/styles/iview.css';
Vue.component('DatePicker', DatePicker);
Vue.config.productionTip = false;

import Toast from 'vue-easy-toast'
Vue.use(Toast);

// 兼容ie
import 'babel-polyfill'

// 跳转后返回顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});
//浏览器标题
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
});




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
