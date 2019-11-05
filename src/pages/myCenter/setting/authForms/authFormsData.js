export default {
    personData: {
        id: "key01",
        title: "身份认证",
        subtitle: "请提交身份证信息，仅用于系统审核",
        fromsList: [
            // POST / api / userInfo / updateDetail
            // 个人信息认证页面接口，提交个人认证信息；传入参数：username姓名，
            // idcardNo身份证号，telephone联系电话，picIdcardFont身份证正面图片base64格式，
            // picIdcardBack身份证反面图片base64格式，picCard名片图片base64格式
            {
                id: "key01-1",
                title: "姓名",
                varType: "username",
                required: true,
                placeholder: "请输入真实姓名"
            },
            {
                id: "key01-2",
                title: "身份证",
                type: "idcard",
                varType: "idcardNo",
                required: true,
                placeholder: "请输入身份证号码"
            },
            {
                id: "key01-3",
                title: "联系电话",
                type: "number",
                varType: "telephone",
                required: true,
                placeholder: "默认注册电话号码"
            }
        ],
        titleList: [
            {
                id: "key01-4",
                varType: "picIdcardFont",
                title: "身份证姓名面"
            },
            {
                id: "key01-5",
                varType: "picIdcardBack",
                title: "身份证国徽面"
            },
            {
                id: "key01-6",
                varType: "picCard",
                title: "请上传个人名片"
            }
        ]
    },

    enterpriseData: {
        id: "key02",
        title: "企业认证",
        subtitle: "请提交营业执照信息，仅用于系统审核",
        fromsList: [
            // POST /api/userInfo/updateCompany
            // 企业信息认证页面接口，提交企业认证信息；
            // 传入参数：companyName企业名称，licenceNo营业执照号，
            // contactsName联系人，contactsPhone联系电话，picLicence营业执照图片base64格式，
            // picContactsCard联系人名片图片base64格式
            {
                id: "key02-1",
                title: "企业名称",
                varType: "companyName",
                required: true,
                placeholder: "请输入企业名"
            },
            {
                id: "key02-2",
                title: "营业执照",
                varType: "licenceNo",
                required: true,
                placeholder: "输入统一社会信用代码"
            },
            {
                id: "key02-3",
                title: "联系人",
                varType: "contactsName",
                required: true,
                placeholder: "请输入管理者姓名"
            },
            {
                id: "key02-4",
                title: "联系人电话",
                varType: "contactsPhone",
                required: true,
                placeholder: "默认注册电话号"
            }
        ],
        titleList: [
            {
                id: "key02-4",
                varType: "picLicence",
                title: "请上传营业执照"
            },
            {
                id: "key02-5",
                varType: "picContactsCard",
                title: "请上传管理者名片"
            }
        ]
    }
}