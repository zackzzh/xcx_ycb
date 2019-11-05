
export const mutations = {
  setBalancePoints(state, o) {
    // console.log("setBalancePoints", o)
    state.balancePoints = o;
  },
  setPaymentInfo(state, o) {
    // console.log("setPayment", o)
    state.paymentInfo = o;
  }
}
