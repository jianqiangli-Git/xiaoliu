<template>
	<view class="indexContent">
		<u-sticky :enable="enable">
			<view style="background: #FFFFFF;border-bottom: 1px solid #F2F2F2;">
				<view>
					<u-tabs 
					active-color="#0DE0FE"
					:list="tabs" 
					:is-scroll="false" 
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
			>
			<view class="goods-list">
				<view 
					class="single-box-1" 
					v-for="(item, index) in goods" 
					:key="index">
					<view>
						<articlebox></articlebox>
					</view>
					<u-gap 
						height="20" 
						bg-color="#f2f2f2" 
						v-if="index < goods.length-1">
					</u-gap>
				</view>
			</view>
		</mescroll-body>
		<u-tabbar 
			:hide-tab-bar="true" 
			:list="list" 
			:mid-button="true" 
			inactive-color="#bfbfbf" 
			active-color="#1296db"
			@change="changeTab">
		</u-tabbar>
	</view>
</template>

<script>
	import articlebox from '@/components/article_box.vue'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	let tabItem = [{
			name: '推荐',
			goods: null,
			num: 1,
			y: 0,
			curPageLen: 0,
			hasNext: true
		},
		{
			name: '关注',
			goods: null,
			num: 1,
			y: 0,
			curPageLen: 0,
			hasNext: true
		}
	]
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			articlebox
		},
		data() {
			return {
				enable: true,
				tabs: tabItem,
				upOption: {},
				tabIndex: 0, // 当前菜单下标
				preIndex: 0, // 前一个菜单下标
				
				/*吸顶悬浮，上拉加载，下拉刷新组件 end*/
				list: [],
				goods: [{},{}],
				windowWidth: 0
			}
		},
		onLoad() {
			this.list = this.$tabList;
			uni.getSystemInfo({
				success: (res) => {
					this.windowWidth = res.windowWidth;
				}
			})
			return
		},
		// 在对应的show和hide页面生命周期中打开或关闭监听
		onShow() {
				this.enable= true
		},
		onHide() {
				this.enable= false
		},
		methods: {
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
