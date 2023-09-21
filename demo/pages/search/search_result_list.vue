<!-- 菜单悬浮的原理: 通过给菜单添加position:sticky实现, 用法超简单, 仅APP端的低端机不兼容 https://caniuse.com/#feat=css-sticky -->
<template>
	<view>
		<!-- 对于mescroll-body: 需设置:sticky="true", 此应避免在mescroll-body标签前面加其他非定位的元素, 否则下拉区域会被挤出, 无法会隐藏.-->
		<!-- 对于mescroll-uni: 则无需设置:sticky="true", 无其他限制和要求 -->
		<mescroll-body :sticky="true" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			
			<!-- sticky吸顶悬浮的菜单, 父元素必须是 mescroll -->
			<view class="sticky-tabs">
				<view class="search-box">
					<u-search placeholder="输入关键词..." v-model="keyword" @search="toSearch()" @custom="toSearch()"></u-search>
				</view>
				<view class="down-menu">
					<u-dropdown  class="u-dropdown" border-bottom @open="uDropdownOpen" @close="uDropdownClose">
						<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
						<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
					</u-dropdown>
				</view>
				
			</view>
			
			<!-- 数据列表 -->
			<!-- <good-list :list="goods"></good-list> -->
			<view class="good-list">
				<view v-for="(aitem, aindex) in goods" :key="aindex" >
					<view class="single-box-1" @click="toGoodsDetail">
						<view class="left">
							<view class="main-img">
								<u-image width="100%" height="200rpx" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1440970343,3385838362&fm=26&gp=0.jpg"></u-image>
							</view>
							<view class="icon-img">
								
							</view>
						</view>
						<view class="right">
							<view class="title">
								飞鹤牧场经典1962加锌铁钙奶粉400G装
							</view>
							<view class="tip">
								草莓味|中国大陆
							</view>
							<view class="price">
								￥99.99
							</view>
						</view>
					
					</view>
				</view>
			</view>
		</mescroll-body>
		
		<!-- 此处可以写其他fixed定位元素 -->
		<!-- <view></view> -->
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// import {apiSearch} from "@/api/mock.js"
	import uDropdown from "@/components/uview-ui/components/u-dropdown/u-dropdown.vue"
	import uDropdownItem from  "@/components/uview-ui/components/u-dropdown-item/u-dropdown-item.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {uDropdown, uDropdownItem},
		data() {
			return {
				keyword: '',
				goods: [], // 数据列表
				tabs: ['全部', '母婴', '图书'],
				tabIndex: 0, // tab下标
				//
				value1: 1,
				value2: 2,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				]
			}
		},
		methods: {
			toGoodsDetail(){
				uni.navigateTo({
					url: '/pages/goods/goods_detail'
				})
			},
			uDropdownOpen(){
				
			},
			uDropdownClose(){
				
			},
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				let keyword = this.tabs[this.tabIndex]
				// this.$api.testGetList({
				//   query: {
				// 	token: 'token',
				// 	page: 'pullScroll.page'
				//   }
				// }).then(curPageData=>{
					let curPageData = []
					let newGoodsData = []
					for(let i = 0; i < 10; i++){
						newGoodsData.push({
							id: 0,
							name: '索引' + this.tabIndex +'菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
							tipText: '菠萝炒饭桂林山水甲天下，张家界凤凰古镇',
							price: '99.99'
						})
					}
					// if(this.goods.length < 20){
						curPageData = newGoodsData
					// }
				// apiSearch(page.num, page.size, keyword).then(curPageData=>{
					if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods=this.goods.concat(curPageData); //追加新数据
					// this.mescroll.endSuccess(curPageData.length); // 隐藏加载状态栏
					this.mescroll.endSuccess(10, true?page.num<2:false);
				// }).catch(()=>{
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
			},
			// 切换菜单
			tabChange () {
				this.goods = []; // 置空列表,显示加载进度条
				this.mescroll.resetUpScroll()
			},
			toSearch(){
				console.log('搜索')
				this.goods = []; // 置空列表,显示加载进度条
				this.mescroll.resetUpScroll()
			}
		}
	}
</script>

<style lang="scss">
	/*下拉菜单的遮罩层会遮挡，必须处理掉*/
	/*.u-dropdown__content__mask{
		display: none;
	}*/
	// .u-dropdown__content{
	// 	display: none;
	// }
	/*下拉菜单的遮罩层会遮挡，必须处理掉end*/
	.search-box{
		padding: 10rpx;
		background-color: #FA436A;
	}
	/*
	sticky生效条件：
	1、父元素不能overflow:hidden或者overflow:auto属性。(mescroll-body设置:sticky="true"即可, mescroll-uni本身没有设置overflow)
	2、必须指定top、bottom、left、right4个值之一，否则只会处于相对定位
	3、父元素的高度不能低于sticky元素的高度
	4、sticky元素仅在其父元素内生效,所以父元素必须是 mescroll
	*/
	.sticky-tabs{
		z-index: 990;
		position: sticky;
		top: var(--window-top);
		background-color: #fff;
	}
	
	// 使用mescroll-uni,则top为0
	.mescroll-uni,
	/deep/.mescroll-uni{
		.sticky-tabs{
			top: 0;
		}
	}
	
	.demo-tip{
		padding: 18rpx;
		font-size: 24rpx;
		text-align: center;
	}
	/*myself*/
	.u-dropdown__content{
		/*display: none;*/
	}
	.single-box-1{
		display: flex;
		padding: 10rpx;
		border-bottom: 1px solid #FEF0F0;
		z-index: 1000;
		view{
			
		}
		.left{
			width: 200rpx;
			.main-img{
				overflow: hidden;
			}
			.icon-img{
				
			}
		}
		.right{
			flex: 1;
			padding-left: 10rpx;
			.title{
				font-size: 32rpx;
				font-weight: 800;
			}
			.tip{
				color: grey;
				font-size: 28rpx;
				padding-top: 10rpx;
				padding-bottom: 10rpx;
			}
			.price{
				color: red;
				font-size: 35rpx;
				font-weight: 900;
			}
		}
		
	}
		
			
</style>
