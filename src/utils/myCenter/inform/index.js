import service from '../../service'

const api = new service()

export default {
    async queryNotice(val) {
        // 获取通知消息
        return await api.commonApi({
            url: "/notice/queryNotice",
            data: val,
            method: "get"
            // method默认为post
        })
    },
    async updateNotice(val) {
        // 标记已读
        return await api.commonApi({
            url: "/notice/updateNotice?noticeId=" + val,
            // data: val,
            method: "get"
            // method默认为post
        })
    },
}