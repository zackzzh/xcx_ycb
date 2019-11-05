export default {
    id: "key01",
    title: "销售不跟踪，最后一场空",
    imgUrl: "/static/images/myCenter/reportForms/01.png",
    logoImgUrl: "http://img1.imgtn.bdimg.com/it/u=1764889320,2724979661&fm=200&gp=0.jpg",
    arrowsImgUrl: "/static/images/myCenter/reportForms/02.png",
    iconImgUrl: "/static/images/myCenter/reportForms/03.png",
    selectList: [
        //datetype=date(日),week（周）,month(月)，不传是默认统计全部数据
        {
            id: "key01-1",
            title: "全部",
            subtitle: "全部"
        },
        {
            id: "key01-2",
            title: "月报表",
            subtitle: "当月",
            varType: "month"
        },
        {
            id: "key01-3",
            title: "周报表",
            subtitle: "当周",
            varType: "week"
        },
        {
            id: "key01-4",
            title: "日报表",
            subtitle: "当天",
            varType: "date"
        }
    ],
    btnList: [
        {
            id: "key01-1-2",
            title: "获取客源",
            varType: "total_cust",
            count: 1600,
            unit: "批"
        }, {
            id: "key01-1-3",
            title: "待跟进",
            varType: "total_N",
            count: 30,
            unit: "批"
        }, {
            id: "key01-1-4",
            title: "跟进中",
            varType: "total_HABC",
            count: 12000,
            unit: "批"
        }, {
            id: "key01-1-5",
            title: "到店",
            varType: "total_Q",
            count: 200,
            unit: "批"
        }, {
            id: "key01-1-6",
            title: "成交",
            varType: "total_O",
            count: 110,
            unit: "批"
        }, {
            id: "key01-1-1",
            title: "战败",
            varType: "total_L",
            count: 21,
            unit: "批"
        }, {
            id: "key01-1-1",
            title: "无效",
            varType: "total_F",
            count: 1,
            unit: "批"
        }
    ],
    formList: [
        // valid_rate有效率，deal_rate成交率，
        // tracking_rate跟进率，tracking_timeliness跟进时效性
        {
            id: "key02-1",
            title: "有效率",
            varType: "valid_rate",
            sumDay: "31", //总天数
            startDay: "2019年01月01日", //起始日期
            endDay: "2019年01月31日", //结束日期
            count: "99", //数量
            timePercent: "99" //时间比
        },
        {
            id: "key02-2",
            title: "成交率",
            varType: "deal_rate",
            sumDay: "31", //总天数
            startDay: "2019年01月01日", //起始日期
            endDay: "2019年01月31日", //结束日期
            count: "30", //数量
            timePercent: "60" //时间比
        },
        {
            id: "key02-3",
            title: "跟进率",
            varType: "tracking_rate",
            sumDay: "31", //总天数
            startDay: "2019年01月01日", //起始日期
            endDay: "2019年01月31日", //结束日期
            count: "40", //数量
            timePercent: "60" //时间比
        },
        { //tracking_timeliness跟进时效性
            id: "key02-4",
            title: "跟进时效性",
            varType: "tracking_timeliness",
            sumDay: "31", //总天数
            startDay: "2019年01月01日", //起始日期
            endDay: "2019年01月31日", //结束日期
            count: "80", //数量
            timePercent: "70" //时间比
        }
    ]
}