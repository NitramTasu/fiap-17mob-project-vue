import user from "./modules/user";
import Vuex from "vuex";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules: {
    user
  },
  strict: debug
});

export default store;
