import CusBase64 from '@/common/js/utils/base64'
import MyBase64 from '@/common/js/utils/bases64'

let API_SECRET_KEY = 'www.mall.cycle.com'
const uniRequest = async (params = {}, url) => {
    let data = params.query || {}
    data['timestamp'] = new Date().getTime()
    data = JSON.stringify(data)
    console.log('检查发送请求时的数据', data)
    data = CusBase64.CusBASE64.encoder(data) 
    data = CusBase64.CusBASE64.encoder(data)
    data = CusBase64.CusBASE64.encoder(data)
    data = CusBase64.CusBASE64.encoder(data)
    return new Promise((resolve, reject) => {
        uni.request({
            url: url, //检查更新的服务器地址
            data: data,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            success: async (res) => {
                let resdata = MyBase64.decode(res.data)
                resdata = MyBase64.decode(resdata)
                resdata = MyBase64.decode(resdata)
                resdata = MyBase64.decode(resdata)
                let tempResultData = JSON.parse(resdata)
                return resolve(tempResultData)
            },
            fail: (err) => {
                console.log('请求失败哦' + err)
                return resolve(err)
            }
        })
    })
}

export default uniRequest
