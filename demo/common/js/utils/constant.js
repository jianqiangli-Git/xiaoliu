/**
 * 用户信息
 * @type {String}
 * sign 用户sign
 * name 真实姓名
 * nickName 昵称
 * phone 手机
 * head_portrait 头像
 */

//缓存和获取授权状态
const setUserAuthor = (res) => {
    uni.setStorageSync('IS_AUTHOR', res);
}

const getUserAuthor = () => {
    let ret = null;
    ret = uni.getStorageSync('IS_AUTHOR');
    return ret;
}

//缓存和获取token
const setUserToken = (res) => {
    uni.setStorageSync('TOKEN', res);
}

const getUserToken = (res) => {
    let ret = null;
    if (!uni.getStorageSync('TOKEN')) {
        return false
    }

    ret = uni.getStorageSync('TOKEN');

    if (!ret) {
        return false
    }

    return ret;
}

//设置用户的信息
const setUserInfo = (res) => {
    uni.setStorageSync('USER_INFO', res);
}

const getUserInfo = () => {
    let ret = null;

    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }

    ret = uni.getStorageSync('USER_INFO');

    if (Object.keys(ret).length == 0) {
        return false;
    }

    return ret;
}


//获取用户sign
const getUserSign = () => {
    let ret = null;
    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }
    ret = uni.getStorageSync('USER_INFO');
    if (!ret.sign) {
        return false
    }
    return ret.sign;
}
//获取用户姓名
const getUserName = () => {
    let ret = null;
    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }
    ret = uni.getStorageSync('USER_INFO');
    if (!ret.name) {
        return false
    }
    return ret.name;
}
//获取用户昵称
const getUserNickName = () => {
    let ret = null;
    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }
    ret = uni.getStorageSync('USER_INFO');
    if (!ret.nickName) {
        return false
    }
    return ret.nickName;
}
//获取用户手机
const getUserPhone = () => {
    let ret = null;
    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }
    ret = uni.getStorageSync('USER_INFO');
    if (!ret.phone) {
        return false
    }
    return ret.phone;
}
//获取用户头像
const getUserHeadPortrait = () => {
    let ret = null;
    if (!uni.getStorageSync('USER_INFO')) {
        return false
    }
    ret = uni.getStorageSync('USER_INFO');
    if (!ret.head_portrait) {
        return false
    }
    return ret.head_portrait;
}
//userInfo的属性end
//get
//获取当前设备所在的平台 'ios'  'android'
const getMachinePlatform = () => {
    let ret = null;
    ret = uni.getStorageSync('machine_platform');
    return ret;
}


export default {
    getUserAuthor,
    setUserAuthor,
    setUserToken,
    getUserToken,
    setUserInfo,
    getUserInfo,


    getUserSign,
    getUserName,
    getUserNickName,
    getUserPhone,
    getUserHeadPortrait,
    getMachinePlatform
}
