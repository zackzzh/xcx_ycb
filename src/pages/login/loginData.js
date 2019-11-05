export default {
    smsLogin: {
        id: "smsLogin",
        other: true,
        title: "登录帐号",
        list: [
            {
                title: "手机号码",
                type: "number",
                varType: "mobile",
                placeholder: "请输入手机号",
                required: true
            },
            {
                title: "短信验证",
                code: true,
                type: "number",
                varType: "msgCode",
                placeholder: "请输入短信验证码",
                required: true
            }
        ]
    },
    passwordLogin: {
        id: "passwordLogin",
        passwordLogin: true,
        title: "登录帐号",
        list: [
            {
                title: "手机号码",
                type: "number",
                varType: "mobile",
                placeholder: "请输入手机号",
                required: true
            },
            {
                title: "登录密码",
                type: "password",
                varType: "password",
                placeholder: "请输入密码",
                required: true
            }
        ]
    },
    register: {
        id: "register",
        agreement: true,
        title: "注册",
        list: [
            // mobile手机号，password密码，username姓名，companyName企业名称，msgCode短信验证码
            {
                title: "企业全称",
                varType: "companyName",
                placeholder: "请输入公司全称",
                required: true
            },
            {
                title: "姓名",
                varType: "username",
                placeholder: "请输入姓名",
                required: true
            },
            {
                title: "登录密码",
                varType: "password",
                type: "password",
                placeholder: "请输入密码",
                required: true
            }, 
            {
                title: "再次输入登录密码",
                varType: "password2",
                type: "password",
                placeholder: "请再次输入密码",
                required: true
            },
            {
                title: "手机号码",
                type: "number",
                varType: "mobile",
                placeholder: "请输入手机号",
                required: true
            },
            {
                title: "短信验证",
                code: true,
                type: "number",
                varType: "msgCode",
                placeholder: "请输入短信验证码",
                required: true
            }
        ]
    }

}