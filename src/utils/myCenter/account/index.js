import service from '../../service'

const api = new service()

export default {
    async getPaymentInfo(val) {
        // 获取收款信息
        return await api.commonApi({
            url: "/userOrder/getBankInfo",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getBrandList(val) {
        // 获取账户中心信息
        return await api.commonApi({
            url: "/userOrder/getBrandList",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async recharge(val) {
        // 充值
        return await api.commonApi({
            url: "/userOrder/recharge?rechargeAmount=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
    async submitOrder(val) {
        // 提交订单
        return await api.commonApi({
            url: "/userOrder/create",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async getCarModel(val) {
        // 根据品牌id查询对应的型号信息接口，传入参数：brandId品牌id
        return await api.commonApi({
            url: "/userOrder/getModelByBrandId?brandId=" + val,
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async wxPayment(val) {
        // 微信支付，传入订单号payment/wxPayCallback
        return await api.commonApi({
            url: "/payment/wxPayment?orderno=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
    async wxPayCallback(val) {
        // 微信支付回调函数
        return await api.commonApi({
            url: "/payment/wxPayCallback",
            data: val,
            // method: "get"
            // method默认为post
        })
    }
}