export default {
    methods: {
        getEnterpriseInfo() {
            // 获取企业信息
            this.$myApi.setting.getEnterpriseInfo().then(res => {
                if (res.code === 200) {
                    this.$store.commit("setting/setCompanyInfo", res.userCompany);
                }
            });
        },
    }
}