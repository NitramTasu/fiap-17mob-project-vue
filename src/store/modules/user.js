// initial state
const state = {
  user: null
};

// getters
const getters = {};

// actions
const actions = {
  setCurrentUser({ commit }, user) {
    commit("setUser", user);
  }
};

// mutations
const mutations = {
    setUser(state, user) {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
