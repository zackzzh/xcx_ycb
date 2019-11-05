const demoMap = new Map()
export default {
    data() {
        return {
            // isIsempty: false
            errorForm: {},
            errorStr: null
        }
    },
    // 各种验证
    methods: {
        // 验证手机号，正确返回true,不是手机号，返回false
        isMobile(val) {
            // 传一个值
            // 139,138,137,136,135,134,133,132,131,130,147,159,158,157,156,155,153,152,150,166,178,170,189,188,187,186,185,183,182,180,199,198
            const regexp = /^1[3456789]\d{9}$/
            // console.log("验证手机号", !val, typeof val);
            if (typeof (val) === "object" && val) {
                return regexp.test(val.mobile)
            } else {
                return regexp.test(val)
            }
        },
        // 非对象，判断是否为空，空返回true
        isemptyStr(val) {
            // console.log("不为对象", val);
            // 不为对象
            if (val === "" || !val) {
                // 空的情况
                this.errorStr = "不能为空"
                return true
            } else {
                this.errorStr = null
                return false
            }
        },
        // 判断俩数值是否一样，一样返回true
        isSame(val) {
            if (val.password === val.password2) {
                // 重置错误信息
                this.errorStr = null;
                return true
            } else {
                // 设置错误信息
                this.errorStr = "密码不一致";
                // this.errorForm[password2] = "密码不一致";
                return false
            }
        },

        // 将Map转为对象，并赋值，错误提示
        setError() {
            // console.log("设置错误信息",val);
            const obj = Object.create(null);
            for (const [key, value] of demoMap) {
                obj[key] = value;
            }
            // Object.fromEntries()
            // console.log("提交errorObj：", obj);
            return obj;
        },
        // 不为空返回true
        notEmpty(val) {
            // console.log("判断是否为空");
            let isNotEmpty = true;
            // 设置Map数据，判断用
            for (const key in val) {
                if (val.hasOwnProperty(key)) {
                    if (key !== "__newReference") {
                        const element = val[key];
                        const isemptyStrBoo = this.isemptyStr(element); //不空为false
                        // console.log("循环中：", key, element, this.errorStr);
                        if (isemptyStrBoo) {
                            isNotEmpty = false;
                        }
                        this.setMap(key, this.errorStr);
                    }
                }
            }
            return isNotEmpty;
        },
        setMap(key, val) {
            demoMap.set(key, val)
        }, 
        clearMap() {
            demoMap.clear()
        }

    }
}