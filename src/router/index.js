import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage'//首页

import productCenter from '@/components/productCenter'//产品中心
import productCenterDetail from '@/components/productCenterDetail'//产品中心详情

import userDynamics from '@/components/userDynamics'//用户动态
import userDynamicsDetail from '@/components/userDynamicsDetail'//用户动态详情

import graphicInformation from '@/components/graphicInformation'//图文资讯
import graphicInformationDetail from '@/components/graphicInformationDetail'//图文资讯详情

import tanwuVideo from '@/components/tanwuVideo'//探物视频
import tanwuVideoDetail from '@/components/tanwuVideoDetail'//探物视频详情

import aboutUs from '@/components/aboutUs'//关于我们
import contactUs from '@/components/contactUs'//联系我们
import joinUs from '@/components/joinUs'//加入我们

import leaseRules from '@/components/leaseRules'//租赁规则
import serviceTerms from '@/components/serviceTerms'//服务条款
import reliefTerms from '@/components/reliefTerms'//免责声明条款

import Login from '@/components/Login'//登陆
import userEditer from '@/components/userEditer'//资料编辑

import rightBar from '@/components/rightBar'//右边导航
import rightScrollTop from '@/components/rightScrollTop'//右边导航返回顶部，联系客服
import footerBar from '@/components/footerBar'//底部导航

import errorPage404 from '@/components/errorPage404'//404


Vue.use(Router)

export default new Router({
  routes: [
      { path: '/',redirect: '/indexPage',},
    {
      path: '/indexPage',
      name: 'indexPage',
      component: indexPage,
      meta: { title: '首页' }
    },
    {
      path: '/productCenter',
      name: 'productCenter',
      component: productCenter,
      meta: { title: '产品中心' }
    },
    {
      path: '/productCenterDetail',
      name: 'productCenterDetail',
      component: productCenterDetail,
      meta: { title: '产品中心详情' }
    },
    {
      path: '/userDynamics',
      name: 'userDynamics',
      component: userDynamics,
      meta: { title: '用户动态' }
    },
    {
      path: '/userDynamicsDetail',
      name: 'userDynamicsDetail',
      component: userDynamicsDetail,
      meta: { title: '用户动态详情' }
    },
    {
      path: '/graphicInformation',
      name: 'graphicInformation',
      component: graphicInformation,
      meta: { title: '图文资讯' }
    },
    {
      path: '/graphicInformationDetail',
      name: 'graphicInformationDetail',
      component: graphicInformationDetail,
      meta: { title: '图文咨询详情' }
    },
    {
      path: '/tanwuVideo',
      name: 'tanwuVideo',
      component: tanwuVideo,
      meta: { title: '探物视频' }
    },
    {
      path: '/tanwuVideoDetail',
      name: 'tanwuVideoDetail',
      component: tanwuVideoDetail,
      meta: { title: '探物视频详情' }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs,
      meta: { title: '关于我们' }
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: contactUs,
      meta: { title: '联系我们' }
    },
    {
      path: '/joinUs',
      name: 'joinUs',
      component: joinUs,
      meta: { title: '加入我们' }
    },
    {
      path: '/leaseRules',
      name: 'leaseRules',
      component: leaseRules,
      meta: { title: '租赁规则' }
    },
    {
      path: '/serviceTerms',
      name: 'serviceTerms',
      component: serviceTerms,
      meta: { title: '服务条款' }
    },
      {

          path: '/reliefTerms',
          name: 'reliefTerms',
          component: reliefTerms,
          meta: { title: '免责声明' }
          },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { title: '登陆' }
    },
    {
      path: '/userEditer',
      name: 'userEditer',
      component: userEditer,
      meta: { title: '用户编辑资料' }
    },
    {
      path: '/rightBar',
      name: 'rightBar',
      component: rightBar,
      meta: { title: '右边导航' }
    },
    {
        path: '/rightScrollTop',
        name: 'rightScrollTop',
        component: rightScrollTop,
        meta: { title: '返回顶部联系客服' }
    },
    {
      path: '/footerBar',
      name: 'footerBar',
      component: footerBar,
      meta: { title: '底部导航' }
    },
    {
        path: '*',
        name: 'errorPage404',
        component: errorPage404,
        meta: { title: '404' }
    },
  ]
})

