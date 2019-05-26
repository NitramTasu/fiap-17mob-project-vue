import user from "./modules/user";
import Vuex from "vuex";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default () => {
  new Vuex.Store({
    modules: {
      user
    },
    state: {
      count: 0
    },
    mutations: {
      add(state, payload) {
        payload ? (state.count += payload) : state.count++;
      },
      subtract(state, payload) {
        payload ? (state.count -= payload) : state.count--;
      }
    },
    actions: {
      addThreeAsync({ commit }) {
        setTimeout(() => commit("add", 3), 3000);
      }
    },
    strict: debug
  });
};
