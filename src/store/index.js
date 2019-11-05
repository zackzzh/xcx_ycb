import Vue from 'vue'
import Vuex from 'vuex'
import commonModule from './common/index'
import customerModule from './customer/index'
import informModule from './inform/index'
import settingModule from './setting/index'
import accountModule from './account/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common: commonModule,
    customer: customerModule,
    inform: informModule,
    setting: settingModule,
    account: accountModule
  }
})
