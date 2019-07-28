import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    phone: '未登录',
    //  stockName
    // stockId
    //stockInfo: {},
  },
  mutations: {
    changeLogin(state, status) {
      state.phone = status;
      localStorage.setItem('phone', state.phone); //本地存储
    },
    localLogin(state, states) {
      state.phone = states;
    },
    addMyposts(state, data) {
      // eslint-disable-next-line no-console
      console.log(state.myposts.data);
      // eslint-disable-next-line no-param-reassign
      state.myposts.push(data);
    },
    addComments(state, data) {
      // eslint-disable-next-line no-param-reassign
      state.mycomments.push(data);
    },
    checkStock(state, data) {
      state.stockInfo = data;
    },

    exitLogin(state) {
      state.phone = '未登录';
      localStorage.setItem('phone', state.phone)
      //window.localStorage.removeItem('phone', state.phone); //清除文件
    }
  },
  actions: {
    loginAction({
      commit
    }, user) {
      commit('changeLogin', user);
    }
  },
});
