import store from "@/store";
class request {
  constructor() {
    this._header = {
      // 'token': "408f99f5-a219-44cf-b6a3-de037cce8ad2" // 自己的
      // 'token': "b7f9c9a3-f483-441e-9e0d-0a12e3ce0d41"
    }
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      // 菊花
      wx.showLoading()
      wx.getStorage({
        key: 'token',
        success: (resToken) => {
          if (resToken) {
            header = {
              "token": resToken.data.token
            }
          }
          wx.request({
            url: url,
            data: data,
            header: header,
            method: method,
            success: (res => {
              if (res.statusCode === 200) {
                console.log(res.data);
                //200: 服务端业务处理正常结束
                if (res.data.code === 503) {
                  wx.clearStorage();
                  wx.reLaunch({
                    url: "/pages/login/main"
                  })
                } else {
                  resolve(res)
                }

              } else {
                //其它错误，提示用户错误信息
                if (this._errorHandler != null) {
                  //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
                  this._errorHandler(res)
                }
                reject(res)
              }
            }),
            fail: (res => {
              if (this._errorHandler != null) {
                this._errorHandler(res)
              }
              reject(res)
            })
          })
        },
        fail: (error) => {
          wx.request({
            url: url,
            data: data,
            header: header,
            method: method,
            success: (res => {
              if (res.statusCode === 200) {
                console.log(res.data);
                //  服务端业务处理正常结束
                if (res.data.code === 503) {
                  wx.clearStorage();
                  wx.reLaunch({
                    url: "/pages/login/main"
                  })
                } else {
                  resolve(res)
                }
              } else {
                //其它错误，提示用户错误信息
                if (this._errorHandler != null) {
                  //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
                  this._errorHandler(res)
                }
                reject(res)
              }
            }),
            fail: (res => {
              if (this._errorHandler != null) {
                this._errorHandler(res)
              }
              reject(res)
            })
          })
        },
        // hide菊花
        complete: (res => {
          wx.hideLoading()
        })
      })
    })
  }
}

export default request
