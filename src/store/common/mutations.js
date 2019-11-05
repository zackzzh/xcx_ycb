
export const mutations = {
  setToken(state, o) {
    state.TOKEN_KEY = o.token
  },
  getUserInfo(state, o) {
    state.userInfo = o;
  }
}
