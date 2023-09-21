<template>
	<view class="indexContent">
		<u-sticky :enable="enable">
			<view style="background: #FFFFFF;border-bottom: 1px solid #F2F2F2;">
				<view class="border-bottom">
					<u-tabs 
					active-color="#0DE0FE"
					:list="tabs"
					:current="tabIndex" 
					@change="tabChange"></u-tabs>
				</view>
			</view>
		</u-sticky>
		<mescroll-body 
			ref="mescrollRef" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback" 
			:up="upOption"
			@scroll="scroll" 
			@topclick="topClick">
		  <view class="goods-list">
			<view class="single-box-1" v-for="(item, index) in goods" :key="index">
			  <view class="mess-box">
				  <view>
					  <imgarticlebox></imgarticlebox>
					</view>
			  </view>
			  <u-gap height="20" bg-color="#f2f2f2" v-if="index < goods.length-1"></u-gap>
			</view>
		  </view>
		</mescroll-body>
		<view>
			<u-tabbar 
			:hide-tab-bar="true" 
			:list="list" 
			:mid-button="true" 
			inactive-color="#bfbfbf" 
			active-color="#1296db"
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
	import imgarticlebox from '@/components/img_article_box.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {imgarticlebox},
		data(){
			return{
				enable: true,
				tabs: tabItem,
				upOption: {},
				tabIndex: 0, // 当前菜单下标
				preIndex: 0, // 前一个菜单下标
				navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
				isShowSticky: false,// 是否悬浮
				/*吸顶悬浮，上拉加载，下拉刷新组件 end*/
				
				list: [],
				goods: [{},{}]
			}
		},
		onLoad() {
			this.list = this.$tabList;
			uni.getSystemInfo({
				success: (res) => {
					this.windowWidth = res.windowWidth;
				}
			})
		},
		// 在对应的show和hide页面生命周期中打开或关闭监听
		onShow() {
				this.enable= true
		},
		onHide() {
				this.enable= false
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
				this.tabIndex = index
				this.downCallback()
			},
			changeTab(res) {
			  console.log(res);
			  if (res != 2) {
			    this.$changeFun(res);
			  }
			},
			mescrollInit(){
			},
			//下拉刷新
			downCallback(){
				//...自定义的页码设置为1；以及goods数据设置为[]
				this.upCallback()
			},
			//上拉加载下一页
			upCallback(){
				//...请求
				//...goods追加数据
				setTimeout(()=>{
					this.mescroll.endSuccess(this.goods.length);
				},1000)
			},
			
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
