import Vue from 'vue'
import App from './App'
import service from './utils/service.js'
import Toast from '../static/vant/toast/toast'
import myApi from './utils/myApi'
import store from "@/store"; // 状态管理

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$api = new service();

Vue.prototype.$myApi = myApi;

Vue.prototype.$toast = Toast;
Vue.prototype.$store = store;
Vue.prototype.$goBackOne = function (val = 1) {
    // 返回前N页，延时1秒，默认返回1页
    setTimeout(() => {
        wx.navigateBack({
            delta: val
        });
    }, 1000);
}

const app = new Vue(App)
app.$mount()


