export default {
    orderPayType: [
        //     POST /api/userOrder/create
        // 用户下单接口（购买线索），传入参数：
        // 普通线索参数lBrandId，lModelId，lCity，lNumber；
        // 精准线索参数tBrandId，tModelId，tCity，tNumber,
        // 使用积分数usedPoints，
        // 支付方式paymentType（0余额、1线下支付、2微信、3支付宝、4其他）选择余额支付时必须填
        {
            id: "key00",
            title: "余额",
            iconUrl: "/static/images/myCenter/recharge/01.png"
        }, {
            id: "key01",
            title: "线下支付",
            iconUrl: "/static/images/myCenter/recharge/02.png"
        }, {
            id: "key02",
            title: "微信",
            iconUrl: "/static/images/myCenter/recharge/wechat.png"
        }, {
            id: "key03",
            title: "其他",
            iconUrl: "/static/images/myCenter/recharge/unionpay.png"
        }
    ],
    rechargePayType: [{
        id: "key01",
        title: "微信",
        iconUrl: "/static/images/myCenter/recharge/wechat.png"
    }, {
        id: "key02",
        title: "其他",
        iconUrl: "/static/images/myCenter/recharge/unionpay.png"
    }]
}