export default {
    data: {
        id: "key01",
        nickname: "这是昵称",
        phone: "13012345678",
        bgImgUrl: "/static/images/myCenter/bgImg.png",
        bImgUrl: "/static/images/myCenter/bImg.png",
        headImgUrl: "/static/images/myCenter/setting/member/01.png",
        list: [
            {
                id: "key01-1",
                title: "管理报表",
                pathUrl: "/pages/myCenter/reportForms/main",
                iconUrl: "/static/images/myCenter/icon/01.png"
            },
            {
                id: "key01-2",
                title: "我的消息",
                pathUrl:"/pages/myCenter/inform/main",
                inform: 6,
                isBadge: true,
                iconUrl: "/static/images/myCenter/icon/02.png"
            },
            {
                id: "key01-3",
                title: "账户中心",
                roleType: "2",
                isAdmin: true,
                pathUrl: "/pages/myCenter/account/main",
                iconUrl: "/static/images/myCenter/icon/03.png"
            },
            {
                id: "key01-4",
                title: "交易记录",
                roleType: "2",
                pathUrl: "/pages/myCenter/trade/main",
                iconUrl: "/static/images/myCenter/icon/04.png"
            },
            {
                id: "key01-5",
                title: "设置",
                pathUrl: "/pages/myCenter/setting/main",
                iconUrl: "/static/images/myCenter/icon/05.png"
            }
        ]
    }
}