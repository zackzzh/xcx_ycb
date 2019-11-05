import service from '../../service'

const api = new service()

export default {
    async getReport(val) {
        // 获取报表
        return await api.commonApi({
            url: "/homePage/report?dateType=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    }
}