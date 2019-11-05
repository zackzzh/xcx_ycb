import service from '../../service'

const api = new service()

export default {
    async getModifyPwdCode(val) {
        // 获取验证码
        return await api.commonApi({
            url: "/sendMsg/modifyPwd",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async changePwd(val) {
        // 修改密码
        val.newPassword = val.password
        return await api.commonApi({
            url: "/user/modifyPwd",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async getBoundCode(val) {
        // 获取绑定验证码
        return await api.commonApi({
            url: "/sendMsg/boundPhone",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async setBoundPhone(val) {
        // 绑定手机
        return await api.commonApi({
            url: "/userInfo/boundPhone",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getQueryCertStauts(val) {
        // 查询个人认证，企业认证状态，
        return await api.commonApi({
            url: "/userInfo/queryCertStauts",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async setQueryCert(val) {
        // 个人认证
        return await api.commonApi({
            url: "/userInfo/updateDetail",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async setCompanyCert(val) {
        // 企业认证
        return await api.commonApi({
            url: "/userInfo/updateCompany",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async getMemberList(val) {
        // 获取成员列表
        return await api.commonApi({
            url: "/cust/querySalesList",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async addSalesByAdmin(val) {
        // 管理员添加成员
        return await api.commonApi({
            url: "/user/addSalesByAdmin",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async delSalesByAdmin(val) {
        // 管理员移除成员
        return await api.commonApi({
            url: "/user/delSalesByAdmin?salesId=" + val.userId,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
    async updatePicHead(val) {
        // 更换头像
        return await api.commonApi({
            url: "/userInfo/updatePicHeadByString",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async getEnterpriseInfo(val) {
        // 获取企业信息
        return await api.commonApi({
            url: "/userInfo/queryCompany",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async setCompanyPhone(val) {
        // 设置企业座机
        return await api.commonApi({
            url: "/userInfo/updateCompanyPhone?telephone=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
    async setCompanyBank(val) {
        // 设置银行账户
        return await api.commonApi({
            url: "/userInfo/updateCompanyBank",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async setCompanyAddr(val) {
        // 设置企业地址
        return await api.commonApi({
            url: "/userInfo/updateCompanyAddr",
            data: val,
            // method: "get"
            // method默认为post
        })
    },
    async getAgreement(val) {
        // 获取协议
        return await api.commonApi({
            url: "/notice/queryProtocol",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getService(val) {
        // 联系客服user/getAddSalesCode
        return await api.commonApi({
            url: "/notice/queryService",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async getAddSalesCode(val) {
        // 生成添加成员二维码
        return await api.commonApi({
            url: "/user/getAddSalesCode",
            data: val,
            method: "get"
            // method默认为post
        })
    }
    
}