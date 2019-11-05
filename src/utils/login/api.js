import service from '../service'

const api = new service()

export default {
    async getLoginCode(val) {
        // 获取登录验证码
        return await api.commonApi({
            url: "/sendMsg/login",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getRegisterCode(val) {
        // 获取登录验证码sendMsg/register
        return await api.commonApi({
            url: "/sendMsg/register",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async loginMsg(val) {
        // 验证码登录
        return await api.commonApi({
            url: "/user/loginByMsgCode",
            data: val,
            // method默认为post
        })
    },
    async loginPwd(val) {
        // 密码登录
        return await api.commonApi({
            url: "/user/loginByPwd",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async register(val) {
        // 注册
        return await api.commonApi({
            url: "/user/register",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async isOauth(val) {
        //查询用户是否已经授权
        return await api.commonApi({
            url: "/user/isOauth",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getWxOpenid(val) {
        //微信登录授权
        return await api.commonApi({
            url: "/user/getWxOpenid?code=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
    async getStartImg(val) {
        //获取启动页图片
        return await api.commonApi({
            url: "/homePage/queryBootPic",
            data: val,
            method: "get"
            // method默认为post
        })
    }
}