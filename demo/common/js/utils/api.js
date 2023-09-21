import uniRequest from '@/common/js/utils/uniRequest';
// import uniUpload from '@/common/js/utils/uniUpload';
const baseUrl = 'http://192.168.50.10:8000'

//mescroll模拟
// const testGetList = (params) => uniRequest(params, apiMall + '')

//登录
const globalLogin = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/login');

//有上级sign的登录注册
const superiorLogin = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/login/?staffSign=xxx');

//更新用户信息
const updateUserInfo = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/updateUserMsg');


//首页
const getHomePage = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/getHomePage');

//产品百科
const productEncyclopedia = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/productEncyclopedia');

//获取商品列表
const getSkuList = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/getSkuList');

//获取商品详情
const getSkuDetail = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/getSkuDetail');

//附近门店
const getNearbyShop = (params) => uniRequest(params, baseUrl + '/electroniccigarette/apiClient/global/getNearbyShop');


export default {
    globalLogin,
    superiorLogin,
    updateUserInfo,
	getHomePage,
	productEncyclopedia,
	getSkuList,
	getSkuDetail,
	getNearbyShop
}
