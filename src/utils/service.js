import request from './request.js'

class service {
  constructor() {
    // this._baseUrl = 'http://192.168.1.126:8099/csa/api' //内网
    this._baseUrl = 'https://www.onemorecar.cn/csa/api' //外网
    this._defaultHeader = {
      'Content-Type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  // 公共Api
  commonApi(val) {
    if (val.method === "get") {
      return this._request.getRequest(this._baseUrl + val.url, val.data).then(res => res.data)
    } else {
      return this._request.postRequest(this._baseUrl + val.url, val.data).then(res => res.data)
    }
  }

  /**
   * 注册
   */
  userRegister(data) {
    return this._request.postRequest(this._baseUrl + '/user/register', data).then(res => res.data)
  }
  /**
   * 手机注册时验证码
   */
  sendMsgRegister(data) {
    return this._request.getRequest(this._baseUrl + '/sendMsg/register', data).then(res => res.data)
  }
  // 获取登录时的验证码
  getLoginMsg(data) {
    // 登录获取验证码
    return this._request.getRequest(this._baseUrl + '/sendMsg/login', data).then(res => res.data)
  }
  // 验证码登录
  loginByMsg(data) {
    return this._request.postRequest(this._baseUrl + '/user/loginByMsgCode', data).then(res => res.data)
  }
  // 获取用户信息
  userInfo(data) {
    return this._request.getRequest(this._baseUrl + '/userInfo', data).then(res => res.data)
  }
  // 获取用户信息
  homePage(data) {
    return this._request.getRequest(this._baseUrl + '/homePage/index', data).then(res => res.data)
  }
  // 获取车品牌和型号信息接口
  getBrandAndModel(data) {
    return this._request.getRequest(this._baseUrl + '/userOrder/getBrandAndModel', data).then(res => res.data)
  }
  // 查询客源信息列表接口
  queryCustomer(data) {
    return this._request.postRequest(this._baseUrl + '/cust/queryCustomer', data).then(res => res.data)
  }
  // 查询销售人员信息列表
  querySalesList(data) {
    return this._request.getRequest(this._baseUrl + '/cust/querySalesList', data).then(res => res.data)
  }
  // 分配客源信息给销售人员
  assigned(data) {
    return this._request.postRequest(this._baseUrl + '/cust/assigned', data).then(res => res.data)
  }
  // 查询客源信息详情
  queryDetail(data) {
    return this._request.getRequest(this._baseUrl + '/cust/queryDetail', data).then(res => res.data)
  }
  // 上传购车发票
  uploadInvoice(data) {
    return this._request.postRequest(this._baseUrl + '/cust/uploadInvoice', data).then(res => res.data)
  }
  // 添加跟进记录
  addTrackingRecord(data) {
    return this._request.postRequest(this._baseUrl + '/cust/addTrackingRecord', data).then(res => res.data)
  }
  //
  getAllBrandList(data) {
    return this._request.getRequest(this._baseUrl + '/userOrder/getAllBrandList', data).then(res => res.data)
  }
}
export default service
