<template>
	<view class="indexContent">
		<view>
			<view v-for="(item, index) in list" :key="index">
				<view>
					<messbox></messbox>
				</view>
				<view>
					<u-gap height="20" bg-color="#f2f2f2" v-if="index < list.length-1"></u-gap>
				</view>
			</view>
		</view>
		<u-tabbar :hide-tab-bar="true" :list="list" :mid-button="true" inactive-color="#bfbfbf" active-color="#1296db"
		          @change="changeTab"></u-tabbar>
	</view>
</template>

<script>
	import messbox from '@/components/message_box.vue'
	// import constant from '@/common/js/utils/constant.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {messbox},
		data() {
			return {
				list: [{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
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
			// if (constant.getUserAuthor().length == 0 || !constant.getUserAuthor()) {
			// 	this.isShowLogin = !this.isShowLogin;
			// 	this.isAuthor = !this.isAuthor;
			// } else {
			// 	this.isShowLogin = !constant.getUserAuthor();
			// 	this.isAuthor = !constant.getUserAuthor();
			// }
		},
		methods:{
			changeTab(res) {
			  console.log(res);
			  if (res != 2) {
			    this.$changeFun(res);
			  }
			}
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
	.indexContent{
		padding-bottom: 150rpx;
	}
	.item {
		display: flex;
	}
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.pay-tabbar{
		position: fixed;
		bottom: 50px;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		box-shadow: 0 0 2px #f0f0f0;
		display: flex;
		align-items: center;
		padding: 25rpx;
		.left{
			display: flex;
			align-items: center;
			flex: 1;
			font-weight: 600;
			view{
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
		}
		.right{
			display: flex;
			align-items: center;
			font-weight: 600;
			.price{
				color: red;
				margin-right: 15rpx;
				font-weight: 500;
			}
		}
	}
	.goods-box{
		display: flex;
		padding: 25rpx;
		padding-right: 0;
		&-single{
			// border-bottom: 1px solid #f0f0f0;
		} 
		.selected-box{
			width: 35rpx;
			position: relative;
			image{
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: 50%;
				margin-top: -18rpx;
			}
		}
		.goods-img{
			width:180rpx;
			height: 180rpx;
			overflow: hidden;
			border-radius: 5rpx;
			box-shadow: 0 0 2px #f0f0f0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.content{
			flex: 1;
			margin-left: 18rpx;
			.title{
				width: 400rpx;
				font-size: 32rpx;
				font-weight: 700;
				margin-bottom: 18rpx;
				.text-box{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			.info{
				color: #DCDFE6;
				font-size: 23rpx;
				margin-bottom: 18rpx;
			}
			.price{
				.big-text{
					font-weight: 800;
					font-size: 35rpx;
				}
			}
			.count{
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	
	
	
	
	
	
</style>