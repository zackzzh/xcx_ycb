export default {
    list: [
        // 返回数据：points可用积分，balance余额，total_number总共购买线索数，finish_rate线索分配完成比例
        {
            id: "key01-1",
            title: "余额",
            varType: "balance",
            amount: 128888,
            iconUrl: "/static/images/myCenter/account/01.png"
        },
        {
            id: "key01-2",
            title: "积分",
            varType: "points",
            amount: 628888,
            iconUrl: "/static/images/myCenter/account/02.png"
        },
        {
            id: "key01-3",
            title: "线索需求",
            varType: "total_number",
            amount: 7888,
            unit: "批",
            iconUrl: "/static/images/myCenter/account/03.png"
        },
        {
            id: "key01-4",
            title: "线索完成率",
            varType: "finish_rate",
            amount: 98,
            unit: "%",
            iconUrl: "/static/images/myCenter/account/04.png"
        }
    ],
    clueList: [
        {
            id: "key02-1",
            varType: "brandList",
            title: "普通类型线索",
            varType: "lPrice",
            state: "lState",
            list: [{
                id: "key02-1-1",
                title: "品牌",
                varType: "brand",
                list: [
                    "本田",
                    "丰田",
                    "比亚迪"
                ]
            }, 
            // {
            //     id: "key02-1-2",
            //     title: "车型",
            //     varType: "model",
            //     list: [
            //         "思域",
            //         "凌派",
            //         "雅阁"
            //     ]
            // },
             {
                id: "key02-1-3",
                title: "城市",
                varType: "city",
                list: [
                    "广州",
                    "北京",
                    "上海",
                    "深圳"
                ]
            }, {
                id: "key02-1-4",
                title: "数量",
                varType: "count",
                list: [
                    "100",
                    "200",
                    "500",
                    "1000"
                ]
            }]
        },
        {
            id: "key02-2",
            title: "精准类型线索",
            varType: "tPrice",
            state: "tState",
            list: [{
                id: "key02-2-1",
                title: "品牌",
                varType: "brand",
                list: [
                    "本田",
                    "丰田",
                    "比亚迪"
                ]
            }, 
            // {
            //     id: "key02-2-2",
            //     title: "车型",
            //     varType: "model",
            //     list: [
            //         "思域",
            //         "凌派",
            //         "雅阁"
            //     ]
            // },
             {
                id: "key02-2-3",
                title: "城市",
                varType: "city",
                list: [
                    "广州",
                    "北京",
                    "上海",
                    "深圳"
                ]
            }, {
                id: "key02-2-4",
                title: "数量",
                varType: "count",
                list: [
                    "100",
                    "200",
                    "500",
                    "1000"
                ]
            }]
        }
    ]
}