<script>
  import constant from "@/common/js/utils/constant";

	export default {

    onLaunch: function() {
      let that = this;
      uni.login({
        success:(res)=>{
          let jsCode = res.code;
          that.$api.globalLogin({
            query:{
              code:jsCode
            }
          }).then((res)=>{
            if(res.errcode == 200){
              let {token,userInfo} = res;
              constant.setUserToken(token);
            }
            console.log('login',res);
          })
        }
      })
		},
		onShow: function() {
			console.log('App Show 2')
		},
		onHide: function() {
			console.log('App Hide')
		},
    methods:{}
	}
</script>

<style>
	/*每个页面公共css */
</style>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/* uni.scss */
	@import "uview-ui/theme.scss";
</style>
