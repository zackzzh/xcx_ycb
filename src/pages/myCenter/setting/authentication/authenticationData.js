export default {
    list: [
        {
            id: "key01-1",
            title: "个人认证",
            subtitle: "扫描上传身份证",
            pathUrl: "/pages/myCenter/setting/authForms/main",
            imgUrl: "/static/images/myCenter/setting/authentication/person.png",
            iconUrl: "/static/images/myCenter/setting/authentication/authenticated.png" //已认证图标
        },
        {
            id: "key01-2",
            title: "企业认证",
            subtitle: "扫描上传营业执照",
            pathUrl: "/pages/myCenter/setting/authForms/main",
            imgUrl: "/static/images/myCenter/setting/authentication/enterprise.png",
            iconUrl: "/static/images/myCenter/setting/authentication/authenticated.png" //已认证图标
        }
    ],
    privilegeData: {
        id: "key02",
        title: "认证特权",
        list: [{
            id: "key02-1",
            title: "VIP会员",
            subtitle: "需支付会员费，后期迭代车源置顶",
            iconUrl: "/static/images/myCenter/setting/authentication/01.png"
        },{
            id: "key02-2",
            title: "4s店认证企业",
            subtitle: "提交企业认证并企业为4S店性质",
            iconUrl: "/static/images/myCenter/setting/authentication/02.png"
        },{
            id: "key02-3",
            title: "综合店认证企业",
            subtitle: "提交企业认证企业非4S店性质",
            iconUrl: "/static/images/myCenter/setting/authentication/03.png"
        },{
            id: "key02-3",
            title: "个人认证企业",
            subtitle: "提交夫妇档口公司个人身份认证",
            iconUrl: "/static/images/myCenter/setting/authentication/04.png"
        }]
    }
}