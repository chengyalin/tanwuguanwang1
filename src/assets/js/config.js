//客户端 开发
//const host = "https://devbeta.tanwuapp.cn/iOS/2.0.0";

// 梁
// const hostLocal = "https://dev.tanwuapp.cn/iOS/1.5.4";
// const hostLocal = "http://192.168.199.180:7001/iOS/1.5.4";
//是客户端测试
//const host3="https://alpha.api2.tanwuapp.cn/iOS/2.0.0";

//测试
const hostLocal = "https://alpha.api2.tanwuapp.cn/iOS/1.5.4";

var productFlag = false;
var uploadFileUrlBase64 =  productFlag ? 'https://up.qbox.me/putb64/-1' : 'https://up-z2.qbox.me/putb64/-1';
var imageHost = productFlag ? 'https://resource.tanwuapp.com/' : 'http://test.resource.tanwuapp.com/';

export const CONFIG = {
    userLoginSMS:hostLocal+'/user/login/SMS',//验证码登陆ok
    login:hostLocal+'/user/login',    //密码登录ok
    userSMScode:hostLocal+'/user/SMScode',//登录  发送验证码 ok

    register:hostLocal+'/user/register',//注册ok
    updataThirdInfo:hostLocal+'/user/update/thirdInfo',//是否已经绑定手机号码ok
    checkTelCode:hostLocal+'/user/Register/SMScode', //注册验证码ok

    userForgetPwd:hostLocal+'/user/forget/pwd',    //忘记密码ok
    userCheckSMScode:hostLocal+'/user/CheckSMScode',    //忘记密码发送验证码ok

    contactUs:hostLocal+"/website/contactUs",//联系我们表单提交接口 ok
    banners:hostLocal+'/website/homes',//首页banner图文介绍 //首页视频区//首页资讯动态板块ok
    aboutUsVideo:hostLocal+'/website/videos',//关于我们视频接口ok
    joinUs:hostLocal+'/website/joinUs',//加入我们ok

    homes:hostLocal+"/website/products",//产品中心列表ok
    productTypes :hostLocal+'/website/productTypes',//产品中心标题ok
    product :hostLocal+'/product/1',//产品中心产品详情头部图文介绍ok
    appraises:hostLocal+'/product/1/appraises',//产品中心产品口碑ok
    appraisePraise:hostLocal+"/appraise/1/praise",//口碑点赞ok
    help:hostLocal+'/help/question', //租赁规则 //常见问题ok

    sharesTags:hostLocal+"/website/shareTags",//动态标签标题ok
    sharesByTag:hostLocal+"/website/sharesByTag",//动态列表ok
    shareDetail:hostLocal+"/website/shareDetail",//用户动态详情列表,ok
    sharePraise:hostLocal+"/website/sharePraise",//动态 点赞icon心图标ok
    shareCommentsNew:hostLocal+"/website/shareComments",//动态评论 获取动态评论列表ok
    shareComment:hostLocal+"/share/comment",//动态 评论提交旧的  ok
    shareCommentPraise:hostLocal+"/share/comment/praise",//动态 评论 手图标icon点赞ok

    themeLabels:hostLocal+"/website/themeLabels",//专题图文资讯标题ok
    themesByLabel:hostLocal+"/website/themesByLabel",// 专题图文资讯列表标ok
    themeDetail:hostLocal+"/website/themeDetail",//专题图文资讯详情ok
    themePraise:hostLocal+"/website/themePraise",//动态 心点赞icon心图标ok
    themeComments:hostLocal+"/website/themeComments",// 获取图文资讯资讯专题评论列表ok
    themeCommentRelease:hostLocal+"/theme/comment/release",//专题评论提交旧的 ok
    handthemepraise:hostLocal+"/theme/comment/praise",//专题点赞手icon  ok

    videoTypes: hostLocal+'/website/videoTypes', //所有视频标签ok
    videosByType: hostLocal+'/website/videosByType', //视频列表(官网专用)ok
	videoDetail:hostLocal + '/website/videoDetail',  //视频详情(官网专用)ok
    videoPraise:hostLocal+'/website/videoPraise',//点赞icon心图标ok
	videoComments:hostLocal + '/website/videoComments',//视频评论列表ok
	videoCommentRelease: hostLocal+'/video/comment/release',//视频 评论提交ok
	videoCommentPraise:hostLocal+'/video/comment/praise',//视频 评论 点赞ok


	userInfo:hostLocal+'/user/info', //个人资料信息
	userUpdate:hostLocal+'/user/update',//个人资料更新
    uploadFileUrlBase64: uploadFileUrlBase64, //七牛 base64
    imageHost:imageHost,    //图片前缀
    uploadToken:hostLocal+'/user/upload',    //获取七牛上传token
    logout:hostLocal+'/user/logout',//退出登录
    user:hostLocal+'/user',//右上角用户信息头像


    //美恰 获取用户信息
    userbaseInfo:hostLocal+'/user/baseInfo',


};
