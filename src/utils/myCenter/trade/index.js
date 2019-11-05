import service from '../../service'

const api = new service()
export default {
  async queryOrder(val) {
    // 查询购买线索订单接口
    return await api.commonApi({
      url: "/userOrder/queryOrder",
      data: val,
      // method默认为post
    })
  },
  async queryRechargeOrder(val) {
    // 查询充值订单接口
    return await api.commonApi({
      url: "/userOrder/queryRechargeOrder",
      data: val,
      // method默认为post
    })
  },
  async uploadInvoice(val) {
    // 上传支付凭证
    return await api.commonApi({
      url: "/userOrder/uploadInvoice",
      data: val,
      // method默认为post
    })
  },
  async queryOrderDetail(val) {
    // 查询订单详情接口
    return await api.commonApi({
      url: "/userOrder/queryOrderDetail",
      data: val,
      method: 'get'
      // method默认为post
    })
  },
  async cancelOrder(val) {
    // 用户取消订单接口
    return await api.commonApi({
      url: "/userOrder/cancelOrder",
      data: val,
      method: 'get'
      // method默认为post
    })
  },

}
