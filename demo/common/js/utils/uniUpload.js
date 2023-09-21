import util from '@/common/js/utils/util'
import MyBase64 from '@/common/js/utils/bases64'
let API_SECRET_KEY = 'www.mall.cycle.com'
let TIMESTAMP = util.getCurrentTime()

const uniRequest = async (params = {}, url) => {
	let data = params.query || {}
	data.time = util.getCurrentTime()
	return new Promise((resolve, reject) => {
    let abc = data
		uni.uploadFile({
			url: url, //仅为示例，非真实的接口地址
			name: data.name,
			formData: {
				'token': data.token
			},
			filePath: data.filePath,
			success: (res) => {
        if(res.statusCode == 200){
          let tempData = MyBase64.decode(res.data)
          tempData = MyBase64.decode(tempData)
          tempData = MyBase64.decode(tempData)
          tempData = MyBase64.decode(tempData)
          tempData = JSON.parse(tempData)
          return resolve(tempData)
        }
        return resolve({
          errcode: 400,
          info: "上传失败"
        })
			},
			fail: (err) => {
			  console.log(err)
			  return resolve(err)
			}
		});
	})
}

export default uniRequest
