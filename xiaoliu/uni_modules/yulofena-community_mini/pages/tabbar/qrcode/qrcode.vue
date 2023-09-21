<template>
  <view class="indexContent">
	 <view class="header">
		<view class="left">
			<view @click="toLastPage">
				<u-icon name="close"></u-icon>
			</view>
		</view>
		<view class="right">
		  <view class="btn" @click="saveArticle">
			  发表
		  </view>
		</view>
	  </view>
	  <view class="text-box">
		  <u-field
		  	label-width="0"
		  	type="textarea"
		  	placeholder="分享新鲜事儿"
		  	:border-bottom="false"
		  >
		  </u-field>
	  </view>
	  <view class="img-box">
		  <view>
				<u-upload :action="action" :file-list="fileList" ></u-upload>
		  </view>
		  
	  </view>
	  <view>
		  
	  </view>
  </view>
</template>

<script>
export default {
	name: "qrcode",
		data() {
			return {
				systemNavHeight: 0,
				// 演示地址，请勿直接使用
				action: 'http://www.example.com/upload',//图片服务器上传地址
				fileList: []
			}
		},
		methods: {
			toLastPage(){
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			},
			saveArticle(){
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			}
		}
}
</script>
<style>
page {
	background-color: #FFFFFF;
}
</style>
<style scoped lang="scss">
.header{
	display: flex;
	padding: 20rpx;
	.left{
		flex: 1;
		view{
			padding: 10rpx;
		}
	}
	.right{
		.btn{
			height: 50rpx;
			padding: 0 20rpx;
			border-radius: 25rpx;
			font-size: 25rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(to right, #2FC1DF, #057ED6);
			color: #FFFFFF;
		}
	}
}
.img-box{
	padding: 20rpx;
}
</style>
