import Vue from 'vue';
import App from './App';

import api from './common/js/utils/api';
import constant from './common/js/utils/constant';
import util from './common/js/utils/util';
import {tabList,changeLastPage,changeAuthorStatus} from './common/js/utils/methods';

import uViewSecond from '@/uview-ui';
Vue.use(uViewSecond);

Vue.prototype.$api = api//接口
Vue.prototype.$constant = constant//获取本地的storage
Vue.prototype.$util = util//公共的方法

//注册登录
Vue.prototype.$toAuthorEvent = changeAuthorStatus //改变授权状态

//底部导航
Vue.prototype.$tabList = tabList //tabbar列表方法
Vue.prototype.$lastPage = 0 //当前tabbar点击的上一个页面
Vue.prototype.$changeFun =  changeLastPage

//二维码页面创建动画
Vue.prototype.$headerAnim = uni.createAnimation();
Vue.prototype.$contentAnim = uni.createAnimation();

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
