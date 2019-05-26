// initial state
// shape: [{ id, quantity }]
const state = {
  user: null
};

// getters
const getters = {
  currentUser: state => state.user
};

// mutations
const mutations = {
  setUser(state, { user }) {
    state.user = user;
  }
};

// actions
const actions = {
  setCurrentUser({ commit }, user) {
    commit("setUser", user);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
