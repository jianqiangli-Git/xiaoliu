<template>
	 
	<view class="indexContent">	
		<me-tabs v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="tabChange" :tabWidth="150"></me-tabs>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption"
					   @scroll="scroll" @topclick="topClick">
		  <view id="tabInList">
			<me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange" :tabWidth="150"></me-tabs>
		  </view>
		  <view class="goods-list">
			<view class="single-box-1" v-for="(item, index) in goods" :key="index">
			  <view class="mess-box">
				  <view>
					  <imgarticlebox></imgarticlebox>
					  <!-- https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00405-743.jpg -->
					  <!-- <u-image width="100%" mode="widthFix" border-radius="20rpx" src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00405-743.jpg"></u-image> -->
				  </view>
			  </view>
			  <!-- 控制每个用户动态之间的间隔 -->
			  <u-gap height="20" bg-color="#f2f2f2" v-if="index < goods.length-1"></u-gap> 
			</view>
		  </view>
		</mescroll-body>
		<view>
			<u-tabbar :hide-tab-bar="true" :list="list" :mid-button="true" inactive-color="#bfbfbf" active-color="#1296db"
					  @change="changeTab"></u-tabbar>
		</view>	
	</view>

</template>

<script>
	let tabItem = [
		{
			name: '名山大川', 
			goods: null,
			num: 1,
			y: 0,
			curPageLen: 0,
			hasNext: true,
		},
		{
			name: '汪洋大海', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '美食', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '心灵洗礼', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '精美服装', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '写真', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '青春', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '性感', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		},
		{
			name: '夜景', 
			goods: null, 
			num: 1, 
			y: 0, 
			curPageLen: 0, 
			hasNext: true,
		}
	]
	import constant from '@/common/js/utils/constant.js'
	import imgarticlebox from '@/components/img_article_box.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {imgarticlebox},
		data(){
			return{
				tabs: tabItem,
				upOption: {},
				tabIndex: 0, // 当前菜单下标
				preIndex: 0, // 前一个菜单下标
				isShowSticky: false,// 是否悬浮
				/*吸顶悬浮，上拉加载，下拉刷新组件 end*/
				
				list: [],
			}
		},
		computed: {
		  goods() {
		    return this.tabs[this.tabIndex].goods
		  }
		},
		onLoad() {
			this.list = this.$tabList;
			uni.getSystemInfo({
				success: (res) => {
					this.windowWidth = res.windowWidth;
				}
			})
		
			//授权处理，判断是否已经授权
			if (constant.getUserAuthor().length == 0 || !constant.getUserAuthor()) {
				this.isShowLogin = !this.isShowLogin;
				this.isAuthor = !this.isAuthor;
			} else {
				this.isShowLogin = !constant.getUserAuthor();
				this.isAuthor = !constant.getUserAuthor();
			}
		},
		methods: {
			changeTab(res) {
			  console.log(res);
			  if (res != 2) {
			    this.$changeFun(res);
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
			changeTab(res) {
			  console.log(res);
			  if (res != 2) {
			    this.$changeFun(res);
			  }
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
	.mess-box{
	}
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}
	
	.u-tab-view {
		height: 100%;
	}
	.tabs-box{
		border-bottom: 1px solid #f2f2f2;
	}
</style>
