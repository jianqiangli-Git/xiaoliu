<template>
  <view class="indexContent">
	  
	<button v-if="isAuthor" @click="isClickAuthor" class="authorBtn"></button>
	
	<me-tabs v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="tabChange" :tabWidth="200"></me-tabs>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption"
	               @scroll="scroll" @topclick="topClick">
	  <view id="tabInList">
	    <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :tabWidth="200"></me-tabs>
	  </view>
	  <view class="goods-list">
	    <view class="single-box-1" v-for="(item, index) in goods" :key="index">
		  <view>
			  <articlebox></articlebox>
		  </view>
		  <u-gap height="20" bg-color="#f2f2f2" v-if="index < goods.length-1"></u-gap>
	    </view>
	  </view>
	</mescroll-body>
	
    <u-tabbar :hide-tab-bar="true" :list="list" :mid-button="true" inactive-color="#bfbfbf" active-color="#1296db"
              @change="changeTab"></u-tabbar>

    <!-- 注册登录弹窗-->
    <u-popup v-model="isShowLogin" mode="center" :closeable="true">
      <view class="popup-content" :style="{width:windowWidth * 0.9 + 'px'}">
        <view class="loginTip">登录或注册</view>
        <view class="loginBtn" @click="toLogin">
          <button open-type="getUserInfo" @getuserinfo="toAuthorFun" class="authorBtn"></button>
          <view class="item">
            <image style="width:48rpx;height: 48rpx;float:right;" mode="widthFix" src="/static/wechatIcon.png"
                   alt="微信授权图标">
          </view>
          <view class="item">微信账号快速登录</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import articlebox from '@/components/article_box.vue'
import constant from '@/common/js/utils/constant.js'
// import api from '@/common/js/utils/api.js'
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

let tabItem = [
  {name: '推荐', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true},
  {name: '特别关注', goods: null, num: 1, y: 0, curPageLen: 0, hasNext: true}
]

export default {
  mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
  components: {articlebox},
  data() {
    return {
		tabs: tabItem,
		upOption: {},
		tabIndex: 0, // 当前菜单下标
		preIndex: 0, // 前一个菜单下标
		navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
		isShowSticky: false,// 是否悬浮
		/*吸顶悬浮，上拉加载，下拉刷新组件 end*/
		list: [],
		isShowLogin: false,
		isAuthor: false,
		windowWidth: 0
    }
  },

  onLoad() {
	console.log("this.$tabList:",this.$tabList) 
	console.log("this:",this)
    this.list = this.$tabList; //[{"0":{"iconPath:xx",":iconSelect:","xx",...}},{}]
    uni.getSystemInfo({
      success: (res) => {
        this.windowWidth = res.windowWidth;
      }
    })
	return
    //授权处理，判断是否已经授权
    if (constant.getUserAuthor().length == 0 || !constant.getUserAuthor()) {
      this.isShowLogin = !this.isShowLogin;
      this.isAuthor = !this.isAuthor;
    } else {
      this.isShowLogin = !constant.getUserAuthor();
      this.isAuthor = !constant.getUserAuthor();
    }
  },
  computed: {
    goods() {
      return this.tabs[this.tabIndex].goods
    }
  },

  methods: {
    toLogin() {
      this.isShowLogin = !this.isShowLogin;
    },
    //授权按钮回调
    toAuthorFun(res) {
      console.log('授权按钮==>', res)
      this.$toAuthorEvent('rawData' in res.detail)
      this.isAuthor = !('rawData' in res.detail)

      if ('rawData' in res.detail) {
        let {gender, avatarUrl, nickName} = res.detail.userInfo;

        let token = constant.getUserToken();

        this.$api.updateUserInfo({
          query: {
            token: token,
            // timestamp:new Date().getTime(),
            gender: gender,
            headerPic: avatarUrl,
            nickName: nickName,
            phoneNumber: 15465845689
          }
        }).then((res) => {
          console.log('授权成功，获取用户信息', res)
          if (res.errcode == 200) {
            constant.setUserInfo(res.userInfo);
            uni.showToast({
              title: '授权成功',
              icon: 'none',
              mask: true
            })
          }
        })

      }

    },
	// 切换菜单
	tabChange(index) {
	  // 记录前一个菜单的数据
	  let preTab = this.tabs[this.preIndex]
	  preTab.y = this.mescroll.getScrollTop(); // 滚动条位置
	  this.preIndex = index;
	  // 当前菜单的数据
	  let curTab = this.tabs[index]
	  if (!curTab.goods) {
	    // 没有初始化,则初始化
	    this.isChangeTab = true;
	    this.mescroll.resetUpScroll()
	  } else {
	    // 初始化过,则恢复之前的列表数据
	    this.mescroll.setPageNum(curTab.num + 1); // 恢复当前页码
	    this.mescroll.endSuccess(curTab.curPageLen, curTab.hasNext); // 恢复是否有下一页或显示空布局
	    this.$nextTick(() => {
	      this.mescroll.scrollTo(curTab.y, 0) // 恢复滚动条的位置
	    })
	  }
	},
    //拒绝授权后点击界面的再次授权提示
    isClickAuthor() {
      this.isShowLogin = !constant.getUserAuthor();
    },
    changeTab(res) {
      console.log("changetab:",res);
	  console.log("this:",this)
  //     if (res != 2) {
  //       this.$changeFun(res);
		// console.log("function：",this.$changeFun(res))
  //     }
    },

    downCallback() {
      this.mescroll.resetUpScroll()
    },

    upCallback(page) {
      if (this.isChangeTab) {
        this.mescroll.hideUpScroll();
        uni.showLoading();
      }
      let keyword = this.tabs[this.tabIndex].name;

      let curPageData = []//curPageData后台返回的列表的数组
      // 当前tab数据
      let curTab = this.tabs[this.tabIndex]
      //设置列表数据
      if (page.num == 1) curTab.goods = []; //如果是第一页需手动制空列表

      let newGoodsData = []
      for (let i = 0; i < 10; i++) {
        newGoodsData.push({
          id: 0,
          name: '索引' + this.tabIndex + '菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
          tipText: '菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
          price: '99.99',
		  boxType: (this.tabIndex == 0)?'goods':'shop'
        })
      }
      if (curTab.goods.length < 20) {
        curPageData = newGoodsData
      }

      curTab.goods = curTab.goods.concat(curPageData); //追加新数据

      // 数据渲染完毕再隐藏加载状态 this.$nextTick在iOS真机不触发,需改成setTimeout
      setTimeout(() => {
        // 需先隐藏加载状态
        this.mescroll.endSuccess(curPageData.length);
        // 再记录当前页的数据
        curTab.num = page.num; // 页码
        curTab.curPageLen = curPageData.length; // 当前页长
        curTab.hasNext = this.mescroll.optUp.hasNext; // 是否还有下一页

        // 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
        // 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
        if (!this.navTop) this.setNavTop()
        // 保持tab悬浮,列表数据显示第一条
        if (this.isChangeTab) {
          this.isChangeTab = false;
          uni.hideLoading();
          if (this.isShowSticky) this.mescroll.scrollTo(this.navTop, 0)
        }
      }, 20)

    },

    // 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的navTop数值是最精确的)
    setNavTop() {
      let view = uni.createSelectorQuery().select('#tabInList');
      view.boundingClientRect(data => {
        this.navTop = data.top // 到屏幕顶部的距离
      }).exec();
    },

    scroll() {
      // 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏
      if (this.mescroll.getScrollTop() >= this.navTop) {
        this.isShowSticky = true // 显示悬浮菜单
      } else {
        this.isShowSticky = false // 隐藏悬浮菜单
      }
    },
    // 点击回到顶部按钮时,先隐藏悬浮菜单,避免闪动
    topClick() {
      this.isShowSticky = false
    },
	toPageBtn(index) {
		uni.navigateTo({
			url: this.boxList[index].pageUrl
		})
    }
  },

  onPageScroll(e) {
    /*吸顶悬浮，上拉加载，下拉刷新组件*/
    if (e.scrollTop >= this.navTop) {
      this.isShowSticky = true // 显示悬浮菜单
    } else {
      this.isShowSticky = false // 隐藏悬浮菜单
    }
    /*吸顶悬浮，上拉加载，下拉刷新组件end*/
  }
}
</script>
 
<style>
.u-mode-center-box {
  border-radius: 20rpx !important;
}
page {
	background-color: #f2f2f2;
}
</style>
<style lang="scss" scoped>
.indexContent {
  position: relative;
}

.authorBtn {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

/*吸顶悬浮，上拉加载，下拉刷新组件*/
.demo-tip {
  padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}

/*吸顶悬浮，上拉加载，下拉刷新组件end*/

.popup-content {
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  font-family: "Microsoft YaHei UI";

  .loginTip {
    font-size: 40rpx;
    text-align: center;
  }

  .loginBtn {
    position: relative;
    display: flex;
    width: 90%;
    height: 100rpx;
    margin: 60rpx auto;
    border-radius: 20rpx;
    background-color: #C69C6C;
    justify-content: center;
    align-items: center;
    font-size: 35rpx;
    color: #ffffff;

    .item {
      flex: auto;
      &:nth-child(2) {
        padding-right: 10rpx;
      }
    }
  }
}

</style>
