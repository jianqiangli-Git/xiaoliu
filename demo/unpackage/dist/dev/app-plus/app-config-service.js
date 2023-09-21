
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/search/index","pages/message/index","pages/personal/index","pages/classification/index","pages/qrcode/qrcode","pages/detail/detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"欢迎来到小流","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#222222","selectedColor":"#1296db","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tab-home.png","selectedIconPath":"/static/tab-home-current.png","text":"广场"},{"pagePath":"pages/classification/index","iconPath":"static/tab-cate.png","selectedIconPath":"static/tab-cate-current.png","text":"摄影"},{"pagePath":"pages/qrcode/qrcode","iconPath":"static/tab-qrCode.png","selectedIconPath":"static/tab-qrCode-current.png","text":"发布"},{"pagePath":"pages/message/index","iconPath":"static/tab-new.png","selectedIconPath":"static/tab-new-current.png","text":"排行"},{"pagePath":"pages/personal/index","iconPath":"static/tab-my.png","selectedIconPath":"static/tab-my-current.png","text":"个人中心"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"个人博客，社区，发布动态（mescroll，uview）示例","compilerVersion":"3.8.12","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"打卡广场"}},{"path":"/pages/search/index","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/message/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"排行榜"}},{"path":"/pages/personal/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/classification/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"招租"}},{"path":"/pages/qrcode/qrcode","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"打卡计划"}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
